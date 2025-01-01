import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Dashboard
          </Typography>
          <Box>
            <NavLink to="/dashboard/Test">
              <Button color="inherit">Test</Button>
            </NavLink>
            <NavLink to="/dashboard/Experiments">
              <Button color="inherit">Expirements</Button>
            </NavLink>
            <NavLink to="/dashboard/History">
              <Button color="inherit">History</Button>
            </NavLink>
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
