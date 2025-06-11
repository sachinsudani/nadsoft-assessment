import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import type { Mark, Subject } from "../types";

type Props = {
  studentId: string;
  initialData?: Mark;
  onSaved: () => void;
};

export const MarksForm: React.FC<Props> = ({
  studentId,
  initialData,
  onSaved,
}) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [form, setForm] = useState({
    subjectId: initialData?.subjectId || "",
    score: initialData?.score ?? 0,
    term: initialData?.term || "",
    year: initialData?.year ?? new Date().getFullYear(),
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);
  const [subjectsLoading, setSubjectsLoading] = useState(true);

  useEffect(() => {
    setSubjectsLoading(true);
    api
      .get("/subject?page=1&limit=100")
      .then((res) => setSubjects(res.data.data))
      .catch(console.error)
      .finally(() => setSubjectsLoading(false));
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "score" || name === "year" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        await api.put(`/mark/${initialData.id}`, {
          score: form.score,
          term: form.term,
          year: form.year,
        });
        setSnackbar({
          open: true,
          message: "Mark updated successfully!",
          severity: "success",
        });
      } else {
        await api.post("/mark", {
          studentId,
          subjectId: form.subjectId,
          score: form.score,
          term: form.term,
          year: form.year,
        });
        setSnackbar({
          open: true,
          message: "Mark added successfully!",
          severity: "success",
        });
      }
      onSaved();
      setForm({
        subjectId: "",
        score: 0,
        term: "",
        year: new Date().getFullYear(),
      });
    } catch (err: any) {
      let message = "An error occurred.";
      if (err.response && err.response.data) {
        message =
          err.response.data.message ||
          (err.response.data.errors && err.response.data.errors.join(", ")) ||
          message;
      }
      setSnackbar({ open: true, message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        maxWidth: 700,
        mx: "auto",
        mt: 3,
        position: "relative",
      }}
    >
      {(loading || subjectsLoading) && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "rgba(255,255,255,0.6)",
            borderRadius: 3,
          }}
        >
          <CircularProgress size={48} />
        </Box>
      )}
      <Typography variant="h5" fontWeight={600} mb={2} align="center">
        {initialData ? "Edit Mark" : "Add Mark"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth required>
              <InputLabel>Subject</InputLabel>
              <Select
                name="subjectId"
                value={form.subjectId}
                onChange={handleChange}
                label="Subject"
              >
                {subjects.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              required
              name="score"
              label="Score"
              type="number"
              inputProps={{ step: "0.01" }}
              value={form.score}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="medium"
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              required
              name="term"
              label="Term"
              value={form.term}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="medium"
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              required
              name="year"
              label="Year"
              type="number"
              value={form.year}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="medium"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 2, py: 1.2, fontWeight: 600 }}
              disabled={loading || subjectsLoading}
            >
              {initialData ? "Update Mark" : "Add Mark"}
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
