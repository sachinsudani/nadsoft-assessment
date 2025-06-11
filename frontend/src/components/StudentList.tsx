import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import type { Student } from "../types";

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity?: "success" | "error";
  }>({ open: false, message: "" });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const navigate = useNavigate();

  const load = async (pageNum = 1) => {
    setLoading(true);
    const res = await api.get(`/student?page=${pageNum}&limit=${limit}`);
    setStudents(res.data.data);
    setTotalPages(Math.ceil(res.data.count / limit) || 1);
    setLoading(false);
  };

  useEffect(() => {
    load(page);
  }, [page]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/student/${deleteId}`);
      setSnackbar({
        open: true,
        message: "Student deleted successfully!",
        severity: "success",
      });
      load(page);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to delete student.",
        severity: "error",
      });
    }
    setDeleteId(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
          <CircularProgress size={48} />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h4" fontWeight={600}>
              Students
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/create")}
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              + Add Student
            </Button>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {["Name", "Email", "Class", "Age", "Actions"].map((h) => (
                    <TableCell key={h}>
                      <strong>{h}</strong>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      {s.firstName} {s.lastName}
                    </TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.class}</TableCell>
                    <TableCell>{s.age}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => navigate(`/students/${s.id}`)}
                          sx={{ borderRadius: 2 }}
                        >
                          View
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => navigate(`/edit/${s.id}`)}
                          sx={{ borderRadius: 2 }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => setDeleteId(s.id)}
                          sx={{ borderRadius: 2 }}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
            <Button
              variant="outlined"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              First
            </Button>
            <Button
              variant="outlined"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
            <Button
              variant="outlined"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >
              Last
            </Button>
          </Stack>
        </Paper>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity || "info"}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: 20 }}>Delete Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="primary" variant="outlined" sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button color="error" onClick={handleDelete} variant="contained" sx={{ borderRadius: 2 }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentList;
