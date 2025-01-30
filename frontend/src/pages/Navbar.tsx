// pages/Navbar.tsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Title on the left */}
          <Typography variant="h6" sx={{ flexGrow: 0.1 }}>
            Llemval
          </Typography>

          {/* Buttons in the middle */}
          <Box>
            <NavLink to="/dashboard/Build" style={{ textDecoration: "none" }}>
              <Button color="inherit">Build</Button>
            </NavLink>
            <NavLink to="/dashboard/Run" style={{ textDecoration: "none" }}>
              <Button color="inherit">Run</Button>
            </NavLink>
            <NavLink to="/dashboard/Log" style={{ textDecoration: "none" }}>
              <Button color="inherit">Log</Button>
            </NavLink>
          </Box>

          {/* Profile button all the way to the right */}
          <Box sx={{ marginLeft: "auto" }}>
            <Button color="inherit">Profile</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} sx={{ mt: 8 }}>
        <Outlet /> {/* This renders the nested sub-pages */}
      </Container>
    </>
  );
};

export default Dashboard;
