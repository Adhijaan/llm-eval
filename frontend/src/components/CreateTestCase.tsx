// components/CreateTestCase.tsx
import { useState } from "react";
import { Alert, Autocomplete, Button, Paper, TextField, Typography, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useExperiments } from "../contexts/ExperimentContext";
import { TestCase } from "../types";
import { createTestCase } from "../api";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface CreateTestCaseProps {
  close: () => void;
}

interface FormErrors {
  name?: string;
  user_prompt?: string;
  expected_output?: string;
  experiments?: string;
  submit?: string;
}

export default function CreateTestCase({ close }: CreateTestCaseProps) {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [testCase, setTestCase] = useState<Partial<TestCase>>({
    name: "",
    user_message: "",
    expected_output: "",
    experiments: [],
  });
  const { experiments, loading, error } = useExperiments();

  async function handleCreate() {
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setErrors({});
      const { id, testCaseResults, ...testCaseData } = testCase;
      await createTestCase(testCaseData as Omit<TestCase, "id" | "testCaseResults">);
      close();
    } catch (error) {
      setErrors({ submit: "Failed to create experiment. Please try again." });
      console.error("Failed to create experiment:", error);
    } finally {
      setSubmitting(false);
    }
  }
  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!testCase.name?.trim()) {
      newErrors.name = "Experiment name is required";
    }

    if (!testCase.user_message?.trim()) {
      newErrors.user_prompt = "User prompt is required";
    }

    if (!testCase.expected_output?.trim()) {
      newErrors.expected_output = "Expected output is required";
    }

    if (testCase.experiments?.length === 0) {
      newErrors.experiments = "At least one experiment must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Create Test Case
      </Typography>
      {errors.submit && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.submit}
        </Alert>
      )}
      <TextField
        fullWidth
        label={"Test Case Name"}
        sx={{ mb: 2 }}
        onChange={(e) => setTestCase((prev) => ({ ...prev, name: e.target.value }))}
      />
      <TextField
        multiline
        fullWidth
        maxRows={15}
        minRows={4}
        label={"User Prompt"}
        sx={{ mb: 2 }}
        onChange={(e) => setTestCase((prev) => ({ ...prev, user_message: e.target.value }))}
      />
      <TextField
        multiline
        fullWidth
        maxRows={15}
        minRows={4}
        label={"Expected Answer"}
        onChange={(e) => setTestCase((prev) => ({ ...prev, expected_output: e.target.value }))}
      />
      <Typography variant="body1">Add to experiment(s)</Typography>
      {error ? (
        <Typography color="error">An error occurred loading your experiments</Typography>
      ) : loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Autocomplete
          multiple
          options={experiments.map((experiment) => ({ id: experiment.id, title: experiment.name }))}
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
          onChange={(_, selectedOptions) => {
            // Map selected experiment IDs to Experiment objects
            const selectedExperiments = experiments.filter((experiment) =>
              selectedOptions.some((option) => option.id === experiment.id)
            );
            setTestCase((prev) => ({ ...prev, experiments: selectedExperiments }));
          }}
        />
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        disabled={
          submitting || !testCase.name || !testCase.user_message || !testCase.expected_output || !testCase.experiments
        }
        onClick={handleCreate}>
        Create
      </Button>
    </Paper>
  );
}
