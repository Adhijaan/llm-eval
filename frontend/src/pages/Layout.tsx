// Pages.Navbar.tsx
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import { ExperimentProvider } from "../contexts/ExperimentContext";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Container maxWidth={false} sx={{ mt: 8 }}>
        <ExperimentProvider>
          <Outlet />
        </ExperimentProvider>
      </Container>
    </>
  );
}
