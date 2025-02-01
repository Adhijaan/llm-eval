// components/ExperimentDesc.tsx
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Experiment, TestCase } from "../types";

interface ExperimentDescProps {
  experiment: Experiment;
  key: number;
}

export default function ExperimentDesc({ experiment }: ExperimentDescProps) {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent sx={{ pt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h5" component="div">
            {experiment.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {experiment.id}
          </Typography>
        </Box>
        {/* {experiment.testCases?.map((testCase, index) => (
          <Typography key={index} variant="body2" color="text.secondary">
            {testCase.id}
          </Typography>
        ))} */}
        <Button>View</Button>
      </CardContent>
    </Card>
  );
}
