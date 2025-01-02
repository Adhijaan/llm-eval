export interface TestCase {
  id: number;
  userMessage: string;
  expectedOutput: string;
  graderType: string; // For now it will be irrelevant. Using LLM as grader.
}

export interface Experiment {
  id: number;
  name: string;
  systemPrompt: string;
}

export interface TestCaseResult {
  id: number;
  experimentRunId: number;
  testCaseId: number;
  score: number;
}
