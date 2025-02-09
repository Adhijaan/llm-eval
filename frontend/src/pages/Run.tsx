// pages/Run.tsx
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Modal from "../components/Modal";
import { Experiment, ExperimentResponse } from "../types";
import { runExperiment } from "../api";
import { useExperiments } from "../contexts/ExperimentContext";

export default function Run() {
  const { experiments, loading, error } = useExperiments();
  const [selectedExperiment, setSelectedExperiment] = useState<number | null>(null);
  const [llmNames, setLlmNames] = useState<string[]>([]);
  const [responses, setResponses] = useState<{ [llmName: string]: ExperimentResponse[] }>({});

  useEffect(() => {
    document.title = "Test Page";
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;

  const handleCheckboxChange = (llmName: string) => {
    setLlmNames((prev) => (prev.includes(llmName) ? prev.filter((name) => name !== llmName) : [...prev, llmName]));
  };

  const handleRunExperiment = async () => {
    if (!selectedExperiment) {
      alert("Please select an experiment.");
      return;
    }

    const newResponses: { [llmName: string]: ExperimentResponse[] } = {};
    for (const llmName of llmNames) {
      try {
        console.log(`Running experiment for ${llmName}...`);
        const data = await runExperiment(selectedExperiment, llmName);
        console.log(`Experiment for ${llmName} completed.`, data);
        const experimentResponses: ExperimentResponse[] = data.map((item: any) => ({
          user_prompt: item.user_prompt,
          response: item.response,
        }));
        newResponses[llmName] = experimentResponses || [];
      } catch (err) {
        console.error(`Failed to run experiment for ${llmName}:`, err);
        newResponses[llmName] = [];
      }
    }

    console.log("Updated Responses:", newResponses); // Debugging
    setResponses(newResponses);
  };

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>
        Test Page
      </Typography>
      <Typography variant="h6" align="center" gutterBottom sx={{ mb: 4 }}>
        Run your Experiments on your choice of LLMs and compare the results.
      </Typography>

      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl fullWidth sx={{ minWidth: 300 }}>
            <InputLabel id="experiment-select">Select Experiment</InputLabel>
            <Select
              labelId="experiment-select"
              id="experiment-select"
              value={selectedExperiment?.toString() ?? ""}
              label="Experiment Name"
              onChange={(event) => setSelectedExperiment(Number(event.target.value))}>
              {loading ? (
                <Typography>Loading...</Typography>
              ) : (
                experiments.map((experiment) => (
                  <MenuItem key={experiment.id} value={experiment.id}>
                    {experiment.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleRunExperiment}>
            Run
          </Button>
        </Box>

        <FormControl component="fieldset" fullWidth>
          <FormGroup row sx={{ justifyContent: "center" }}>
            <Grid2 container spacing={2} justifyContent="center">
              <Grid2>
                <FormControlLabel
                  control={<Checkbox onChange={() => handleCheckboxChange("llama-3.3-70b-versatile")} />}
                  label="llama-3.3-70b-versatile"
                />
              </Grid2>
              <Grid2>
                <FormControlLabel
                  control={<Checkbox onChange={() => handleCheckboxChange("gemma2-9b-it")} />}
                  label="gemma2-9b-it"
                />
              </Grid2>
              <Grid2>
                <FormControlLabel
                  control={<Checkbox onChange={() => handleCheckboxChange("mixtral-8x7b-32768")} />}
                  label="mixtral-8x7b-32768"
                />
              </Grid2>
            </Grid2>
          </FormGroup>
        </FormControl>
      </Container>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
            padding: 2,
          }}>
          {llmNames.length > 0 ? (
            llmNames.map((llmName) => (
              <Modal
                key={llmName}
                modalName={llmName}
                selectedExperiment={selectedExperiment!}
                responses={responses[llmName] || []}
              />
            ))
          ) : (
            <Typography variant="body1" align="center" gutterBottom>
              No LLMs selected. Please select at least one LLM to run the experiment.
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
}
