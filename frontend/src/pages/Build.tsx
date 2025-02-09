// pages/Build.tsx
import { useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import ExperimentDesc from "../components/ExperimentDesc";
import { useExperiments } from "../contexts/ExperimentContext";

export default function Build() {
  const { experiments, loading, error } = useExperiments();
  const [selectedExperiment, setSelectedExperiment] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Build";
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;

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
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        experiments.map((experiment, index) => <ExperimentDesc key={index} experiment={experiment} />)
      )}
    </>
  );
}
