import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import type { Student } from "../types";

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const navigate = useNavigate();

  const load = async () => {
    const res = await api.get("/student?page=1&limit=10");
    setStudents(res.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" onClick={() => navigate("/create")}>
          + Add Student
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
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
                  <Button
                    size="small"
                    onClick={() => navigate(`/students/${s.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    onClick={() => navigate(`/edit/${s.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      api.delete(`/student/${s.id}`).then(load);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StudentList;
