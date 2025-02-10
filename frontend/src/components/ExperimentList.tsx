// components/ExperimentList.tsx
import { Box, Typography } from "@mui/material";
import ExperimentItem from "./ExperimentItem";
import { useExperiments } from "../contexts/ExperimentContext";

interface ExperimentListProps {
  selectedExperimentId: number | null;
  setSelectedExperimentId: (id: number) => void;
}

export default function ExperimentList({ selectedExperimentId, setSelectedExperimentId }: ExperimentListProps) {
  const { experiments, loading, error } = useExperiments();
  return (
    <Box sx={{ flex: 1 }}>
      {error ? (
        <Typography color="error">An error occurred loading your experiments</Typography>
      ) : loading ? (
        <Typography>Loading...</Typography>
      ) : (
        experiments.map((experiment) => (
          <ExperimentItem
            key={experiment.id}
            experiment={experiment}
            isSelected={selectedExperimentId === experiment.id}
            onSelect={() => setSelectedExperimentId(experiment.id)}
          />
        ))
      )}
    </Box>
  );
}
