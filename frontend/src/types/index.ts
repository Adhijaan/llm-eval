export interface TestCase {
    id: number;
    userMessage: string;
    expectedOutput: string;
    graderType: string;
  }
  
  export interface Experiment {
    id: number;
    name: string;
    systemPrompt: string;
    testCases: number[];
  }
  
  export interface TestCaseResult {
    id: number;
    experimentRunId: number;
    testCaseId: number;
    score: number;
  }