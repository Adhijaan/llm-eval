// TestCase interface
export interface TestCase {
  id: number;
  user_message: string; // Maps to `user_message` in Pydantic
  expectedOutput: string; // Maps to `expected_output`
  experiments?: Experiment[]; // Related Experiments
  testCaseResults?: TestCaseResult[]; // Related TestCaseResults
}

// Experiment interface
export interface Experiment {
  id: number;
  name: string;
  system_prompt: string; // Maps to `system_prompt`
  user_id: number; // Maps to `user_id`
  testCases?: TestCase[]; // Related TestCases
  runs?: ExperimentRun[]; // Related ExperimentRuns
}

// ExperimentRun interface
export interface ExperimentRun {
  id: number;
  experiment_id: number; // Maps to `experiment_id`
  llm_model: string; // Maps to `llm_model`
  run_date: string; // Maps to `run_date`, ISO 8601 format
  experiment?: Experiment; // Related Experiment
  testCaseResults?: TestCaseResult[]; // Related TestCaseResults
}

// TestCaseResult interface
export interface TestCaseResult {
  id: number;
  experiment_run_id: number; // Maps to `experiment_run_id`
  test_case_id: number; // Maps to `test_case_id`
  llm_model: string; // Maps to `llm_model`
  score: number; // Float, with a range [0, 100]
  experimentRun?: ExperimentRun; // Related ExperimentRun
  testCase?: TestCase; // Related TestCase
}

// User interface
export interface User {
  id: number;
  name: string;
  email: string;
  experiments?: Experiment[]; // Related Experiments
}

export interface ExperimentResponse {
  user_prompt: string;
  response: string;
}
