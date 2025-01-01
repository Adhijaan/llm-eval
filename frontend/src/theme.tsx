// src/theme.ts
import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#6C63FF", // A futuristic purple (primary color)
      light: "#A39BFF", // Lighter shade of primary
      dark: "#4A40CC", // Darker shade of primary
    },
    secondary: {
      main: "#FF6584", // A warm pink (secondary color)
      light: "#FF9AAE", // Lighter shade of secondary
      dark: "#CC4A6B", // Darker shade of secondary
    },
    background: {
      default: "#F5F5F5", // Light gray background for a clean look
      paper: "#FFFFFF", // White for cards and surfaces
    },
    text: {
      primary: "#333333", // Dark gray for primary text
      secondary: "#666666", // Medium gray for secondary text
    },
    success: {
      main: "#4CAF50", // Green for success messages
    },
    warning: {
      main: "#FFC107", // Amber for warnings
    },
    error: {
      main: "#FF5252", // Red for errors
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif", // A modern, friendly font
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
      color: "#333333",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 500,
      color: "#333333",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 500,
      color: "#333333",
    },
    body1: {
      fontSize: "1rem",
      color: "#666666",
    },
    button: {
      textTransform: "none", // Buttons with normal case text
      fontWeight: 500,
    },
  },
  spacing: 8, // Consistent spacing unit
  shape: {
    borderRadius: 12, // Rounded corners for a friendly feel
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // Rounded buttons
          padding: "10px 20px", // Comfortable padding
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // Rounded cards
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Soft shadow
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
