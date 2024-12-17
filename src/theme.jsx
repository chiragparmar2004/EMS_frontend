// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#ffd166",
//       contrastText: "#ffffff",
//     },
//     secondary: {
//       main: "#457b9d",
//       contrastText: "#ffffff",
//     },
//     success: {
//       main: "#43996f",
//       contrastText: "#ffffff",
//     },
//     background: {
//       default: "#2d2d2d ",
//       paper: "#1d1c1c",
//     },
//     text: {
//       primary: "#ffffff",
//       secondary: "#797979",
//       contrastText: "#000000",
//     },
//     error: {
//       main: "#e63946",
//       contrastText: "#ffffff",
//     },
//     warning: {
//       main: "#e63946",
//       contrastText: "#ffffff",
//     },
//     divider: "#e0e0e0",
//   },
//   typography: {
//     //fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     fontFamily: '"Segoe UI", "Tahoma", "Geneva","Verdana", "sans-serif"',

//     h1: { fontSize: "2.5rem", fontWeight: 700 },
//     h2: { fontSize: "2rem", fontWeight: 600 },
//     h3: { fontSize: "1.75rem", fontWeight: 500 },
//     h4: { fontSize: "1.5rem", fontWeight: 500 },
//     h5: { fontSize: "1.25rem", fontWeight: 500 },
//     h6: { fontSize: "1.125rem", fontWeight: 500 },
//     body1: { fontSize: "1rem", lineHeight: 1.5 },
//     body2: { fontSize: "0.875rem", lineHeight: 1.5 },
//     button: { textTransform: "none", fontWeight: 500 },
//   },
//   shape: {
//     borderRadius: 8,
//   },
//   spacing: 8,
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 6,
//           transition: "all 0.2s ease",
//           padding: "8px 16px",
//           boxShadow: "none",
//           "&:hover": {
//             boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
//           },
//         },
//         outline: {
//           borderRadius: 8,
//           borderWidth: "2px",
//           borderColor: "#1976d2",
//           // color: "#1976d2",
//           padding: "8px 22px", // Slightly adjusted padding for outlined variant
//           "&:hover": {
//             // backgroundColor: "rgba(25, 118, 210, 0.1)", // Subtle hover background
//             borderColor: "#42a5f5", // Lighter border on hover
//             // color: "#42a5f5",
//           },
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//           boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
//           padding: "20px",
//           backgroundColor: "#ffffff",
//         },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           padding: "12px 20px",
//           borderBottom: "1px solid #e0e0e0",
//         },

//         head: {
//           fontWeight: 600,
//           color: "#1d3557",
//           backgroundColor: "#f1faee",
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "& .MuiOutlinedInput-root": {
//             borderRadius: 2,
//             "& fieldset": {
//               borderColor: "#f5f5f5",
//             },
//             "&:hover fieldset": {
//               borderColor: "#ffffff",
//             },
//             "&.Mui-focused fieldset": {
//               borderColor: "#ffd166",
//               borderRadius: 6,
//             },
//           },
//         },
//       },
//     },
//     MuiDialog: {
//       styleOverrides: {
//         paper: {
//           borderRadius: 12,
//           boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//           backgroundColor: "#ffffff",
//         },
//       },
//     },
//     MuiSelect: {
//       styleOverrides: {
//         root: {
//           borderRadius: 6,
//           "& .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#f5f5f5",
//           },
//           "&:hover .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#ffffff",
//           },
//           "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#ffd166",
//           },
//           "& .MuiSvgIcon-root": {
//             color: "#ffd166",
//           },
//         },
//         select: {
//           backgroundColor: "#2d2d2d",
//           padding: "10px 14px",
//           borderRadius: 6,
//           "&:focus": {
//             backgroundColor: "#2d2d2d",
//           },
//         },
//       },
//     },
//   },
// });

// export default theme;

/////////////////////////////  2  //////////////////////////////
// import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#ff6347", // A more vibrant red
//       contrastText: "#ffffff",
//     },
//     secondary: {
//       main: "#4caf50", // A fresh green
//       contrastText: "#ffffff",
//     },
//     success: {
//       main: "#32cd32", // Lively green
//       contrastText: "#ffffff",
//     },
//     background: {
//       default: "#121212", // Darker background for better contrast
//       paper: "#1e1e1e", // Slightly lighter paper background for readability
//     },
//     text: {
//       primary: "#ffffff", // Keep white for readability
//       secondary: "#b0b0b0", // Softer secondary text
//       contrastText: "#000000",
//     },
//     error: {
//       main: "#f44336", // Bold error color
//       contrastText: "#ffffff",
//     },
//     warning: {
//       main: "#ff9800", // A warmer warning color
//       contrastText: "#ffffff",
//     },
//     divider: "#666666", // Lighter divider
//   },
//   typography: {
//     fontFamily: '"Segoe UI", "Tahoma", "Geneva", "Verdana", sans-serif',
//     h1: { fontSize: "3rem", fontWeight: 700, letterSpacing: "-0.02em" },
//     h2: { fontSize: "2.5rem", fontWeight: 600, letterSpacing: "-0.02em" },
//     h3: { fontSize: "2rem", fontWeight: 500 },
//     h4: { fontSize: "1.75rem", fontWeight: 500 },
//     h5: { fontSize: "1.5rem", fontWeight: 500 },
//     h6: { fontSize: "1.25rem", fontWeight: 500 },
//     body1: { fontSize: "1rem", lineHeight: 1.6 },
//     body2: { fontSize: "0.875rem", lineHeight: 1.6 },
//     button: { textTransform: "none", fontWeight: 600 },
//   },
//   shape: {
//     borderRadius: 12, // Slightly rounded corners
//   },
//   spacing: 8,
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 10, // Rounded button edges
//           padding: "10px 20px",
//           boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//           background: "linear-gradient(45deg, #ff6347, #ff7f50)", // Gradient effect
//           color: "#ffffff",
//           "&:hover": {
//             boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.3)",
//             background: "linear-gradient(45deg, #ff7f50, #ff6347)", // Hover effect with reversed gradient
//           },
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//           padding: "20px",
//           backgroundColor: "#2a2a2a", // Slightly darker background
//         },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           padding: "14px 24px",
//           borderBottom: "1px solid #444444", // Darker borders
//         },
//         head: {
//           fontWeight: 600,
//           color: "#ffffff",
//           backgroundColor: "#333333", // Darker header background
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "& .MuiOutlinedInput-root": {
//             borderRadius: 10,
//             "& fieldset": {
//               borderColor: "#444444", // Lighter border
//             },
//             "&:hover fieldset": {
//               borderColor: "#ffd166", // Hover color remains vibrant
//             },
//             "&.Mui-focused fieldset": {
//               borderColor: "#ff6347", // Focused fieldset with primary color
//               borderWidth: 2,
//             },
//           },
//         },
//       },
//     },
//     MuiDialog: {
//       styleOverrides: {
//         paper: {
//           borderRadius: 16, // More rounded dialog
//           boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.15)",
//           backgroundColor: "#2a2a2a",
//         },
//       },
//     },
//     MuiSelect: {
//       styleOverrides: {
//         root: {
//           borderRadius: 10,
//           "& .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#444444",
//           },
//           "&:hover .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#ff6347", // Hover state with primary color
//           },
//           "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#ff6347",
//           },
//           "& .MuiSvgIcon-root": {
//             color: "#ff6347", // Matching icon color
//           },
//         },
//         select: {
//           backgroundColor: "#333333", // Dark background for select
//           padding: "10px 16px",
//           borderRadius: 10,
//           "&:focus": {
//             backgroundColor: "#333333",
//           },
//         },
//       },
//     },
//   },
// });

// export default theme;

////////////////////////////3////////////////////////

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Bright blue
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff4081", // Pink accent
      contrastText: "#ffffff",
    },
    success: {
      main: "#4caf50", // Green for success
      contrastText: "#ffffff",
    },
    background: {
      default: "#121212", // Dark mode background
      paper: "#1e1e1e", // Slightly lighter for contrast
    },
    text: {
      primary: "#ffffff", // Bright white for primary text
      secondary: "#bdbdbd", // Softer gray for secondary text
      disabled: "#757575",
    },
    error: {
      main: "#f44336", // Red for errors
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ff9800", // Orange for warnings
      contrastText: "#ffffff",
    },
    divider: "#404040", // Soft divider
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: "2.5rem", fontWeight: 700 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    h3: { fontSize: "1.75rem", fontWeight: 500 },
    h4: { fontSize: "1.5rem", fontWeight: 500 },
    h5: { fontSize: "1.25rem", fontWeight: 400 },
    h6: { fontSize: "1rem", fontWeight: 400 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.6 },
    button: { textTransform: "uppercase", fontWeight: 500 },
  },
  shape: {
    borderRadius: 8, // Softer corners
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          color: "#ffffff",
          "&:hover": {
            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.3)",
          },
        },
        outlined: {
          border: "2px solid white",
          // borderRadius: 8,
          borderWidth: "2px",
          borderColor: "#1976d2",
          padding: "8px 22px", // Slightly adjusted padding for outlined variant
          "&:hover": {
            borderColor: "#42a5f5", // Lighter border on hover
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          backgroundColor: "#1c1c1c",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "12px 20px",
          borderBottom: "1px solid #444444",
        },
        head: {
          fontWeight: 600,
          color: "#ffffff",
          backgroundColor: "#2b2b2b",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            "& fieldset": {
              borderColor: "#555555",
            },
            "&:hover fieldset": {
              borderColor: "#42a5f5",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2",
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#222222",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#555555",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2",
          },
          "& .MuiSvgIcon-root": {
            color: "#1976d2",
          },
        },
        select: {
          // backgroundColor: "#333333",
          // padding: "8px 16px",
          "&:focus": {
            backgroundColor: "#333333",
          },
        },
      },
    },
  },
});

export default theme;
