import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import React, { useState } from "react";
import api from "../api/axios";
import type { Student } from "../types";

type StudentFormProps = {
  initialData?: Partial<Student>;
  onResult?: (result: { success: boolean }) => void;
  mode?: "create" | "edit";
};

const StudentForm: React.FC<StudentFormProps> = ({
  initialData = {},
  onResult,
  mode = "create",
}) => {
  const [form, setForm] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    email: initialData.email || "",
    class: initialData.class || "",
    age: initialData.age || 0,
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "age" ? +value : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "edit" && initialData && initialData.id) {
        await api.put(`/student/${initialData.id}`, form);
        setSnackbar({
          open: true,
          message: "Student updated successfully!",
          severity: "success",
        });
      } else {
        await api.post("/student", form);
        setSnackbar({
          open: true,
          message: "Student added successfully!",
          severity: "success",
        });
        setForm({ firstName: "", lastName: "", email: "", class: "", age: 0 });
      }
      onResult && onResult({ success: true });
    } catch (err: any) {
      let message = "An error occurred.";
      if (err.response && err.response.data) {
        message =
          err.response.data.message ||
          (err.response.data.errors && err.response.data.errors.join(", ")) ||
          message;
      }
      setSnackbar({ open: true, message, severity: "error" });
      onResult && onResult({ success: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, borderRadius: 3, maxWidth: 500, mx: "auto", position: 'relative' }}
    >
      {loading && (
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.6)', borderRadius: 3 }}>
          <CircularProgress size={48} />
        </Box>
      )}
      <Typography variant="h5" fontWeight={600} mb={2} align="center">
        Student Information
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {["firstName", "lastName", "email", "class", "age"].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                fullWidth
                required
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={(form as any)[field]}
                onChange={handleChange}
                variant="outlined"
                size="medium"
                disabled={loading}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 2, py: 1.2, fontWeight: 600 }}
              disabled={loading}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default StudentForm;
