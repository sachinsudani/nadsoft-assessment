import React, { useEffect, useState } from "react";
import api from "../api/axios";
import type { Student, Mark } from "../types";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { MarksForm } from "../components/MarksForm";
import { MarksList } from "../components/MarksList";

const StudentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [editingMark, setEditingMark] = useState<Mark | undefined>(undefined);

  const fetch = async () => {
    const res = await api.get(`/student/${id}`);
    setStudent(res.data.data);
  };
  useEffect(() => {
    fetch();
  }, [id]);

  const handleSaved = () => {
    setEditingMark(undefined);
    fetch();
  };

  const deleteMark = async (markId: string) => {
    await api.delete(`/mark/${markId}`);
    fetch();
  };

  if (!student)
    return (
      <Container>
        <Typography>Loading…</Typography>
      </Container>
    );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {student.firstName} {student.lastName}
      </Typography>
      <Typography>Email: {student.email}</Typography>
      <Typography>Class: {student.class}</Typography>
      <Typography>Age: {student.age}</Typography>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Marks
      </Typography>
      <MarksList
        marks={student.marks || []}
        onEdit={(m) => setEditingMark(m)}
        onDelete={deleteMark}
      />
      <MarksForm
        studentId={student.id}
        initialData={editingMark}
        onSaved={handleSaved}
      />
    </Container>
  );
};

export default StudentDetailPage;
