import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import type { Subject } from "../types";

export const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const fetch = async () => {
    const res = await api.get("/subject?page=1&limit=10");
    setSubjects(res.data.data);
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Subjects
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {["Code", "Name", "Department"].map((h) => (
              <TableCell key={h}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.code}</TableCell>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
