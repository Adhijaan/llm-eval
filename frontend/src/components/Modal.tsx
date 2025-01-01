import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";

export default function Modal({ modalName = "Modal Name" }) {
  const [responses, setResponses] = useState<string[]>([]);

  useEffect(() => {
    setResponses(["Response 1", "Response 2", "Response 3"]);
  }, []);

  return (
    <Card sx={{ maxWidth: 345, minWidth: 300, minHeight: 300 }}>
      <CardHeader title={modalName} sx={{ textAlign: "center" }} />
      {/* <ModalResponses /> */}
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
    </Card>
  );
}
