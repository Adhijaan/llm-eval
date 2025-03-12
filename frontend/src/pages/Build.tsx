// pages/Build.tsx
import { useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import ExperimentList from "../components/ExperimentList";
import ExperimentInfo from "../components/ExperimentInfo";
import CreateExperiment from "../components/CreateExperiment";
import CreateTestCase from "../components/CreateTestCase";
import { useExperiments } from "../contexts/ExperimentContext";
// import { Experiment } from "../types";

enum ViewState {
  PLAIN,
  CREATE_EXPERIMENT,
  CREATE_TEST_CASE,
  EXPERIMENT_DESC,
}

export default function Build() {
  const { experiments } = useExperiments();
  const [selectedExperimentId, setSelectedExperimentId] = useState<number | null>(null);
  const selectedExperiment = experiments.find((experiment) => experiment.id === selectedExperimentId);
  const [viewState, setViewState] = useState<ViewState>(ViewState.PLAIN);

  useEffect(() => {
    document.title = "Build";
  }, []);
  useEffect(() => {
    selectedExperimentId ? setViewState(ViewState.EXPERIMENT_DESC) : setViewState(ViewState.PLAIN);
  }, [selectedExperimentId]);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>
        Build
      </Typography>
      <Typography variant="h6" align="center" gutterBottom sx={{ mb: 4 }}>
        Define experiements and assign test cases
      </Typography>
      <Container maxWidth={false} sx={{ mb: 4, pb: 1, borderColor: red, borderBottom: 1 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          onClick={() => setViewState(ViewState.CREATE_EXPERIMENT)}>
          Create Experiment
        </Button>
        <Button variant="outlined" color="primary" onClick={() => setViewState(ViewState.CREATE_TEST_CASE)}>
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

        {viewState === ViewState.EXPERIMENT_DESC && selectedExperiment && (
          <ExperimentInfo
            experiment={selectedExperiment}
            setSelectedExperimentId={() => setSelectedExperimentId(null)}
          />
        )}
        {viewState === ViewState.CREATE_EXPERIMENT && <CreateExperiment close={() => setViewState(ViewState.PLAIN)} />}
        {viewState === ViewState.CREATE_TEST_CASE && <CreateTestCase close={() => setViewState(ViewState.PLAIN)} />}
      </Container>
    </>
  );
}
