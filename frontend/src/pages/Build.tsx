// pages/Build.tsx
import { useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Experiment } from "../types";
import { getExperiments } from "../api";
import ExperimentDesc from "../components/ExperimentDesc";
export default function Build() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  useEffect(() => {
    document.title = "Build";
    getExperiments().then((data) => setExperiments(data));
  }, []);
  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>
        Build
      </Typography>
      <Typography variant="h6" align="center" gutterBottom sx={{ mb: 4 }}>
        Define experiements and assign test cases
      </Typography>
      <Container maxWidth={false} sx={{ mb: 4, pb: 1, borderColor: red, borderBottom: 1 }}>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          Create Experiment
        </Button>
        <Button variant="contained" color="primary">
          Create Test Case
        </Button>
      </Container>
      <Container maxWidth="lg"></Container>
      {experiments.map((experiment, index) => (
        <ExperimentDesc key={index} experiment={experiment} />
      ))}
    </>
  );
}
