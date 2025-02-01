// components/ExperimentDesc.tsx
import { Card, CardContent, Typography } from "@mui/material";
import { Experiment } from "../types";
export default function ExperimentDesc(experiment: Experiment) {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {experiment.name}
        </Typography>
        {experiment.testCases?.map((testCase, index) => (
            
        ))}
      </CardContent>
    </Card>
  );
}
