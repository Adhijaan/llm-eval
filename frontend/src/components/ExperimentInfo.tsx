import { Button, Paper, Typography, TextField } from "@mui/material";
import { Experiment } from "../types";

interface ExperimentInfoProps {
  experiment: Experiment;
  setSelectedExperimentId: () => void;
}

export default function ExperimentInfo({ experiment, setSelectedExperimentId }: ExperimentInfoProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: "100%", md: "50%" },
        minWidth: { xs: "100%", md: "300px" },
        padding: 2,
        position: "relative",
        height: "fit-content",
      }}>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        {experiment.name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        System Prompt:
      </Typography>
      <TextField multiline value={experiment.system_prompt} fullWidth maxRows={12} minRows={4} disabled />
      <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
        Assosiated Test Cases:
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Feature coming soon
      </Typography>

      <Button
        onClick={setSelectedExperimentId}
        variant="text"
        color="secondary"
        sx={{ position: "absolute", top: 10, right: 10 }}>
        Close
      </Button>
    </Paper>
  );
}
