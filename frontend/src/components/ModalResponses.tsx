import { useState, useEffect } from "react";
import { CardContent, Typography } from "@mui/material";

export default function ModalResponses() {
  const [responses, setResponses] = useState<string[]>([]);

  useEffect(() => {
    setResponses(["Response 1", "Response 2", "Response 3"]);
  }, []);

  return (
    <CardContent sx={{ paddingTop: 0 }}>
      {responses.length === 0 ? (
        <></>
      ) : (
        responses.map((response, index) => (
          <Typography variant="body1" key={index}>
            <Typography variant="h6"> Test {index + 1} </Typography>
            {response}
          </Typography>
        ))
      )}
    </CardContent>
  );
}
