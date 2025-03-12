// pages/Log.tsx
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getResults } from "../api";
import { TestCaseResult } from "../types";

export default function Log() {
  const [results, setResults] = useState<TestCaseResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getResults();
        setResults(data);
      } catch (err) {
        setError("Failed to fetch results. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Test Case Results
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Experiment Run ID</TableCell>
              <TableCell>Test Case ID</TableCell>
              <TableCell>LLM Model</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.experiment_run_id}</TableCell>
                <TableCell>{result.test_case_id}</TableCell>
                <TableCell>{result.llm_model}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
