// pages/Build.tsx
import { useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import ExperimentList from "../components/ExperimentList";
import ExperimentInfo from "../components/ExperimentInfo";
import { useExperiments } from "../contexts/ExperimentContext";
import { Experiment } from "../types";

export default function Build() {
  const { experiments } = useExperiments();
  const [selectedExperimentId, setSelectedExperimentId] = useState<number | null>(null);
  const selectedExperiment = experiments.find((experiment) => experiment.id === selectedExperimentId);

  useEffect(() => {
    document.title = "Build";
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
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "flex-start" },
        }}>
        <ExperimentList selectedExperimentId={selectedExperimentId} setSelectedExperimentId={setSelectedExperimentId} />
        {selectedExperiment && (
          <ExperimentInfo
            experiment={selectedExperiment}
            setSelectedExperimentId={() => setSelectedExperimentId(null)}
          />
        )}
      </Container>
    </>
  );
}
