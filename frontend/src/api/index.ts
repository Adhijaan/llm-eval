import axios from "axios";
import { Experiment, TestCase, TestCaseResult } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createTestCase = async (testCase: Omit<TestCase, "id">) => {
  const response = await axios.post(`${API_BASE_URL}/api/test-cases`, testCase);
  return response.data;
};

export const deleteTestCase = async (testCaseId: number) => {
  await axios.delete(`${API_BASE_URL}/api/test-cases/${testCaseId}`);
};

export const getExperiments = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/experiments`);
  return response.data;
};

export const createExperiment = async (experiment: Omit<Experiment, "id">) => {
  const response = await axios.post(`${API_BASE_URL}/api/experiments`, experiment);
  return response.data;
};

export const deleteExperiment = async (experimentId: number) => {
  await axios.delete(`${API_BASE_URL}/api/experiments/${experimentId}`);
};

export const runExperiment = async (experimentId: number, model: string) => {
  const response = await axios.get(`${API_BASE_URL}/api/experiments/${experimentId}/run`, {
    params: { model },
  });
  return response.data;
};

export const getResults = async (): Promise<TestCaseResult[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/results`);
  return response.data;
};
