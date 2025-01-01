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
            <NavLink to="/dashboard/Test" style={{ textDecoration: "none" }}>
              <Button color="inherit">Test</Button>
            </NavLink>
            <NavLink to="/dashboard/Experiments" style={{ textDecoration: "none" }}>
              <Button color="inherit">Experiments</Button>
            </NavLink>
            <NavLink to="/dashboard/History" style={{ textDecoration: "none" }}>
              <Button color="inherit">History</Button>
            </NavLink>
          </Box>

          {/* Profile button all the way to the right */}
          <Box sx={{ marginLeft: "auto" }}>
            <Button color="inherit">Profile</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet /> {/* This renders the nested sub-pages */}
      </Container>
    </>
  );
};

export default Dashboard;
