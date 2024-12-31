import axios from "axios";
import { Experiment, TestCase, TestCaseResult } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createTestCase = async (testCase: Omit<TestCase, "id">) => {
  const response = await axios.post(`${API_BASE_URL}/api/test-cases`, testCase);
  return response.data;
};

export const deleteTestCase = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/api/test-cases/${id}`);
};

export const createExperiment = async (experiment: Omit<Experiment, "id">) => {
  const response = await axios.post(`${API_BASE_URL}/api/experiments`, experiment);
  return response.data;
};

export const runExperiment = async (experimentId: number) => {
  const response = await axios.post(`${API_BASE_URL}/api/experiments/${experimentId}/run`);
  return response.data;
};

export const getResults = async (): Promise<TestCaseResult[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/results`);
  return response.data;
};
