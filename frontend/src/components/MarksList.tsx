import React from "react";
import type { Mark } from "../types";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

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
            <Button size="small" onClick={() => onEdit(m)}>
              Edit
            </Button>
            <Button size="small" color="error" onClick={() => onDelete(m.id)}>
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
