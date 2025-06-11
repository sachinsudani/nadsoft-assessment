import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import StudentForm from "../components/StudentForm";

const StudentCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    await api.post("/student", data);
    navigate("/");
  };

  return (
    <div>
      <h2>Create Student</h2>
      <StudentForm onSubmit={handleSubmit} />
    </div>
  );
};

export default StudentCreatePage;
