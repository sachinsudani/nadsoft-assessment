import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import StudentForm from "../components/StudentForm";
import type { Student } from "../types";

const StudentEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/student/${id}`);
      setStudent(res.data.data);
    };
    fetchData();
  }, [id]);

  if (!student)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
        <Typography component="span" sx={{ position: 'absolute', opacity: 0 }}>Loading...</Typography>
        <CircularProgress size={48} />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" fontWeight={600} align="center" mb={3}>
        Edit Student
      </Typography>
      <StudentForm
        initialData={student}
        mode="edit"
        onResult={({ success }) => {
          if (success) navigate("/");
        }}
      />
    </Box>
  );
};

export default StudentEditPage;
