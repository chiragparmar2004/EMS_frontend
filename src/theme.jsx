import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffd166",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#457b9d",
      contrastText: "#ffffff",
    },
    success: {
      main: "#43996f",
      contrastText: "#ffffff",
    },
    background: {
      default: "#1d3557",
      paper: "#000e32",
    },
    text: {
      primary: "#ffffff",
      secondary: "#457b9d",
      contrastText: "#000000",
    },
    error: {
      main: "#e63946",
      contrastText: "#ffffff",
    },
    divider: "#e0e0e0",
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: "2.5rem", fontWeight: 700 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    h3: { fontSize: "1.75rem", fontWeight: 500 },
    h4: { fontSize: "1.5rem", fontWeight: 500 },
    h5: { fontSize: "1.25rem", fontWeight: 500 },
    h6: { fontSize: "1.125rem", fontWeight: 500 },
    body1: { fontSize: "1rem", lineHeight: 1.5 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          transition: "all 0.2s ease",
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "12px 20px",
          borderBottom: "1px solid #e0e0e0",
        },
        head: {
          fontWeight: 600,
          color: "#1d3557",
          backgroundColor: "#f1faee",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "& fieldset": {
              borderColor: "#f5f5f5",
            },
            "&:hover fieldset": {
              borderColor: "#ffffff",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ffd166",
              borderRadius: 6,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#f5f5f5",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffd166",
          },
          "& .MuiSvgIcon-root": {
            color: "#ffd166",
          },
        },
        select: {
          backgroundColor: "#000e32",
          padding: "10px 14px",
          borderRadius: 6,
          "&:focus": {
            backgroundColor: "#000e32",
          },
        },
      },
    },
  },
});

export default theme;
