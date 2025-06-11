import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import React, { useState } from "react";
import type { Student } from "../types";

type StudentFormProps = {
  initialData?: Partial<Student>;
  onSubmit: (
    data: Omit<Student, "id" | "createdAt" | "updatedAt" | "marks">
  ) => void;
};

const StudentForm: React.FC<StudentFormProps> = ({
  initialData = {},
  onSubmit,
}) => {
  const [form, setForm] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    email: initialData.email || "",
    class: initialData.class || "",
    age: initialData.age || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "age" ? +value : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {["firstName", "lastName", "email", "class", "age"].map((field) => (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              fullWidth
              required
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              value={(form as any)[field]}
              onChange={handleChange}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default StudentForm;
