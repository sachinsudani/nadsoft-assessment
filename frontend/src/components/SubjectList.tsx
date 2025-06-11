import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box,
  Pagination,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import type { Subject } from "../types";

export const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetch = async (pageNum = 1) => {
    setLoading(true);
    const res = await api.get(`/subject?page=${pageNum}&limit=${limit}`);
    setSubjects(res.data.data);
    setTotalPages(Math.ceil(res.data.total / limit) || 1);
    setLoading(false);
  };
  useEffect(() => {
    fetch(page);
  }, [page]);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Subjects
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress size={40} />
        </Box>
      ) : (
        <>
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
          <Stack alignItems="center" mt={2}>
            <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="primary" shape="rounded" />
          </Stack>
        </>
      )}
    </Container>
  );
};
