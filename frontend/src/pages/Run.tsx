import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Modal from "../components/Modal";

export default function Run() {
  //   Rename title
  useEffect(() => {
    document.title = "Test Page";
  }, []);

  const [Experiment, setExperiment] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setExperiment(event.target.value as string);
  };

  const [llmNames, setLlmNames] = useState<string[]>([]);
  const handleCheckboxChange = (llmName: string) => {
    setLlmNames((prev) => (prev.includes(llmName) ? prev.filter((name) => name !== llmName) : [...prev, llmName]));
  };
  useEffect(() => {
    console.log("Updated LLM Names:", llmNames);
  }, [llmNames]);

  const handleRun = () => {
    if (llmNames.length === 0) {
      alert("Please select at least one LLM to run the experiment.");
      return;
    }
    console.log("Running Experiment:", Experiment, "on LLMs:", llmNames);
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
              value={Experiment}
              label="Experiment Name"
              onChange={handleChange}>
              <MenuItem value={"ExperimentID"}>ExperimentName</MenuItem>
              {/* Add more MenuItem components for other experiments */}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleRun}>
            Run
          </Button>
        </Box>

        <FormControl component="fieldset" fullWidth>
          <FormGroup row sx={{ justifyContent: "center" }}>
            <Grid2 size={4} container spacing={2} justifyContent="center">
              <Grid2 size={4}>
                <FormControlLabel
                  control={<Checkbox onChange={() => handleCheckboxChange("openai")} />}
                  label="OpenAI"
                />
              </Grid2>
              <Grid2 size={4}>
                <FormControlLabel
                  control={<Checkbox onChange={() => handleCheckboxChange("cohere")} />}
                  label="Cohere"
                />
              </Grid2>
              <Grid2 size={4}>
                <FormControlLabel
                  control={<Checkbox onChange={() => handleCheckboxChange("huggingface")} />}
                  label="Hugging Face"
                />
              </Grid2>
            </Grid2>
          </FormGroup>
        </FormControl>
      </Container>
      <Container maxWidth="lg">
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" align="center" gutterBottom>
            System Prompt
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            System Prompt Text
          </Typography>
        </Box>
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
            llmNames.map((llmName) => <Modal key={llmName} modalName={llmName} />)
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
