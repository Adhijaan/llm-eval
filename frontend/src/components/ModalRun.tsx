import { Card, CardHeader, CardContent } from "@mui/material";

export default function ModalRun({ modalName = "Modal Name" }) {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 300 }}>
      <CardHeader title={modalName} sx={{ textAlign: "center" }} />
      {/* <CardContent>
        <p>User Prompt 1</p>
        <p>Response 1</p>
      </CardContent> */}
    </Card>
  );
}
