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

  const handleSubmit = async (data: any) => {
    await api.put(`/student/${id}`, data);
    navigate("/");
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Student</h2>
      <StudentForm initialData={student} onSubmit={handleSubmit} />
    </div>
  );
};

export default StudentEditPage;
