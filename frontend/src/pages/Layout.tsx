// Pages.Navbar.tsx
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Container maxWidth={false} sx={{ mt: 8 }}>
        <Outlet /> {/* This renders the nested sub-pages */}
      </Container>
    </>
  );
}

// export default Dashboard;
