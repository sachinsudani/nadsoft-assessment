import {
  Alert,
  Button,
  CircularProgress,
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { MarksForm } from "../components/MarksForm";
import { MarksList } from "../components/MarksList";
import type { Mark, Student } from "../types";

const StudentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [editingMark, setEditingMark] = useState<Mark | undefined>(undefined);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity?: "success" | "error";
  }>({ open: false, message: "" });
  const [deleteMarkId, setDeleteMarkId] = useState<string | null>(null);

  const fetch = async () => {
    try {
      const res = await api.get(`/student/${id}`);
      setStudent(res.data.data);
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to load student.",
        severity: "error",
      });
    }
  };
  useEffect(() => {
    fetch();
  }, [id]);

  const handleSaved = () => {
    setEditingMark(undefined);
    fetch();
    setSnackbar({
      open: true,
      message: "Mark saved successfully!",
      severity: "success",
    });
  };

  const handleDeleteMark = async () => {
    if (!deleteMarkId) return;
    try {
      await api.delete(`/mark/${deleteMarkId}`);
      setSnackbar({
        open: true,
        message: "Mark deleted successfully!",
        severity: "success",
      });
      fetch();
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to delete mark.",
        severity: "error",
      });
    }
    setDeleteMarkId(null);
  };

  if (!student)
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
          <CircularProgress size={48} />
        </Box>
      </Container>
    );

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 3, maxWidth: 700, mx: "auto", mt: 4 }}
      >
        <Typography variant="h4" fontWeight={600} gutterBottom align="center">
          {student.firstName} {student.lastName}
        </Typography>
        <Table sx={{ mb: 3 }}>
          <TableBody>
            <TableRow>
              <TableCell variant="head">Email</TableCell>
              <TableCell>{student.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Class</TableCell>
              <TableCell>{student.class}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Age</TableCell>
              <TableCell>{student.age}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Marks
        </Typography>
        <MarksList
          marks={student.marks || []}
          onEdit={(m) => setEditingMark(m)}
          onDelete={(id) => setDeleteMarkId(id)}
        />
        <MarksForm
          studentId={student.id}
          initialData={editingMark}
          onSaved={handleSaved}
        />
      </Paper>
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
      <Dialog
        open={!!deleteMarkId}
        onClose={() => setDeleteMarkId(null)}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: 20 }}>
          Delete Mark
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this mark? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteMarkId(null)}
            color="primary"
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            onClick={handleDeleteMark}
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentDetailPage;
