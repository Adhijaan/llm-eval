// pages//Welcome.jsx
import { Link } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";

export default function Welcome() {
  return (
    <Box
      textAlign="center"
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: "0 auto",
        mt: 10,
      }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Meet <span style={{ color: "#6C63FF" }}>Llemval</span>
      </Typography>
      <Typography variant="h5" component="h3" color="textSecondary" gutterBottom>
        A simplified way to compare multiple LLMs in the context of your needs.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          mt: 4,
          borderRadius: "12px",
          padding: "10px 30px",
          textTransform: "none",
          fontSize: "1.1rem",
        }}
        component={Link}
        to="/App/Run">
        Get Started
      </Button>
    </Box>
  );
}
