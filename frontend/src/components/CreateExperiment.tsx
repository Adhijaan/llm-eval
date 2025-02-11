// components/CreateExperiment.tsx
import { useState } from "react";
import { Button, Paper, TextField, Typography, Checkbox, Autocomplete, Alert } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { createExperiment } from "../api";
import { Experiment } from "../types";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface CreateExperimentProps {
  close: () => void;
}

interface FormErrors {
  name?: string;
  system_prompt?: string;
  submit?: string;
}

export default function CreateExperiment({ close }: CreateExperimentProps) {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [experiment, setExperiment] = useState<Partial<Experiment>>({
    name: "",
    system_prompt: "",
    user_id: 1, // TODO: Create an auth context to get the user id
    testCases: [],
  });

  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!experiment.name?.trim()) {
      newErrors.name = "Experiment name is required";
    }

    if (!experiment.system_prompt?.trim()) {
      newErrors.system_prompt = "System prompt is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleCreate() {
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setErrors({});
      const { testCases, runs, id, ...experimentData } = experiment;
      await createExperiment(experimentData as Omit<Experiment, "id" | "testCases" | "runs">);
      close();
    } catch (error) {
      setErrors({ submit: "Failed to create experiment. Please try again." });
      console.error("Failed to create experiment:", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: "10%", sm: "50%" },
        minWidth: "50vw",
        padding: 2,
        position: "relative",
        height: "fit-content",
      }}>
      <Button variant="text" color="secondary" sx={{ position: "absolute", top: 10, right: 10 }} onClick={close}>
        Close
      </Button>

      <Typography variant="h3" sx={{ textAlign: "center", mb: 3 }}>
        Create Experiment
      </Typography>

      {errors.submit && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.submit}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Experiment Name"
        value={experiment.name}
        onChange={(e) => setExperiment((prev) => ({ ...prev, name: e.target.value }))}
        error={!!errors.name}
        helperText={errors.name}
        sx={{ mb: 2 }}
      />

      <TextField
        multiline
        fullWidth
        maxRows={15}
        minRows={4}
        label="System Prompt"
        value={experiment.system_prompt}
        onChange={(e) => setExperiment((prev) => ({ ...prev, system_prompt: e.target.value }))}
        error={!!errors.system_prompt}
        helperText={errors.system_prompt}
      />

      <Typography variant="body1" sx={{ mt: 2 }}>
        Add test cases to this experiment
      </Typography>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={[{ title: "Test 1" }, { title: "Test 2" }, { title: "Test 3" }]}
        disableCloseOnSelect
        getOptionLabel={(option) => option.title}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
              {option.title}
            </li>
          );
        }}
        style={{ width: 500 }}
        renderInput={(params) => <TextField {...params} label="Checkboxes" placeholder="Favorites" />}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleCreate} disabled={submitting}>
        {submitting ? "Creating..." : "Create"}
      </Button>
    </Paper>
  );
}
