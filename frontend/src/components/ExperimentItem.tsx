// components/ExperimentItem.tsx
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Experiment } from "../types";

interface ExperimentItemProps {
  experiment: Experiment;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ExperimentItem({ experiment, isSelected, onSelect }: ExperimentItemProps) {
  return (
    <Card
      sx={{
        mb: 2,
        border: isSelected ? 2 : 0,
        borderColor: "primary.main",
      }}>
      <CardContent sx={{ pt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h5" component="div">
            {experiment.name}
          </Typography>
        </Box>
        <Button onClick={onSelect}>{isSelected ? "Selected" : "View"}</Button>
      </CardContent>
    </Card>
  );
}
