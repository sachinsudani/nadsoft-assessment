import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";

const StudentCreatePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" fontWeight={600} align="center" mb={3}>
        Create Student
      </Typography>
      <StudentForm
        mode="create"
        onResult={({ success }) => {
          if (success) navigate("/");
        }}
      />
    </Box>
  );
};

export default StudentCreatePage;
