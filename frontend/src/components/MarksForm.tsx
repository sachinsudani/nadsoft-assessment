import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import type { Mark, Subject } from "../types";

type Props = {
  studentId: string;
  initialData?: Mark;
  onSaved: () => void;
};

export const MarksForm: React.FC<Props> = ({
  studentId,
  initialData,
  onSaved,
}) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [form, setForm] = useState({
    subjectId: initialData?.subjectId || "",
    score: initialData?.score ?? 0,
    term: initialData?.term || "",
    year: initialData?.year ?? new Date().getFullYear(),
  });

  useEffect(() => {
    api
      .get("/subject?page=1&limit=100")
      .then((res) => setSubjects(res.data.data))
      .catch(console.error);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "score" || name === "year" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData) {
        await api.put(`/mark/${initialData.id}`, {
          score: form.score,
          term: form.term,
          year: form.year,
        });
      } else {
        await api.post("/mark", {
          studentId,
          subjectId: form.subjectId,
          score: form.score,
          term: form.term,
          year: form.year,
        });
      }
      onSaved();
      setForm({
        subjectId: "",
        score: 0,
        term: "",
        year: new Date().getFullYear(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid xs={12} sm={3}>
          <FormControl fullWidth required>
            <InputLabel>Subject</InputLabel>
            <Select
              name="subjectId"
              value={form.subjectId}
              onChange={handleChange}
              label="Subject"
            >
              {subjects.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid xs={12} sm={2}>
          <TextField
            required
            name="score"
            label="Score"
            type="number"
            inputProps={{ step: "0.01" }}
            value={form.score}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid xs={12} sm={2}>
          <TextField
            required
            name="term"
            label="Term"
            value={form.term}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid xs={12} sm={2}>
          <TextField
            required
            name="year"
            label="Year"
            type="number"
            value={form.year}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid xs={12} sm={3}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {initialData ? "Update Mark" : "Add Mark"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
