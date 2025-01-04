import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { ExperimentResponse } from "../types";

interface ModalProps {
  modalName: string;
  selectedExperiment: number;
  responses: ExperimentResponse[];
}

export default function Modal({ modalName, responses }: ModalProps) {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 300, minHeight: 300 }}>
      <CardHeader title={modalName} sx={{ textAlign: "center" }} />
      <CardContent sx={{ paddingTop: 0 }}>
        {responses.length === 0 ? (
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            No responses yet. Run the experiment to see results.
          </Typography>
        ) : (
          responses.map((response, index) => (
            <Typography variant="body1" key={index} sx={{ marginTop: 2 }}>
              <Typography variant="h6">{response.user_prompt}</Typography>
              {response.response}
            </Typography>
          ))
        )}
      </CardContent>
    </Card>
  );
}
