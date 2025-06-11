import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import type { Mark } from "../types";

type MarksListProps = {
  marks: Mark[];
  onEdit: (mark: Mark) => void;
  onDelete: (id: string) => void;
};

export const MarksList: React.FC<MarksListProps> = ({
  marks,
  onEdit,
  onDelete,
}) => (
  <Table sx={{ marginTop: 2 }}>
    <TableHead>
      <TableRow>
        {["Subject", "Score", "Term", "Year", "Actions"].map((h) => (
          <TableCell key={h}>{h}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {marks.map((m) => (
        <TableRow key={m.id}>
          <TableCell>{m.subject?.name}</TableCell>
          <TableCell>{m.score}</TableCell>
          <TableCell>{m.term}</TableCell>
          <TableCell>{m.year}</TableCell>
          <TableCell>
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => onEdit(m)}
                sx={{ borderRadius: 2 }}
              >
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                variant="outlined"
                onClick={() => onDelete(m.id)}
                sx={{ borderRadius: 2 }}
              >
                Delete
              </Button>
            </Stack>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
