import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const SubjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Container>
      <Typography variant="h4">Subject Detail - {id}</Typography>
    </Container>
  );
};

export default SubjectPage;
