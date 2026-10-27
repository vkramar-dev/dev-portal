import { createTheme } from "@mui/material/styles";

const sans = '"IBM Plex Sans", "Segoe UI", sans-serif';
const mono = '"IBM Plex Mono", Consolas, monospace';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-mui-color-scheme",
  },
  defaultColorScheme: "light",
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: sans,
    h1: {
      fontFamily: sans,
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: sans,
      fontWeight: 600,
      fontSize: "1.375rem",
      lineHeight: 1.25,
    },
    h5: {
      fontFamily: sans,
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.3,
    },
    body1: {
      fontFamily: sans,
      fontSize: "1rem",
      lineHeight: 1.7,
    },
    button: {
      fontFamily: mono,
      textTransform: "none",
    },
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#E7EDF1",
          paper: "#F5F8F9",
        },
        text: {
          primary: "#1B2430",
          secondary: "#526170",
        },
        divider: "#9AAABA",
        primary: {
          main: "#C44712",
          contrastText: "#F5F8F9",
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#0E141B",
          paper: "#16202A",
        },
        text: {
          primary: "#E6EDF2",
          secondary: "#A9B7C4",
        },
        divider: "#314152",
        primary: {
          main: "#FF6A2C",
          contrastText: "#0E141B",
        },
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--mui-palette-divider) 42%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--mui-palette-divider) 42%, transparent) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          backgroundAttachment: "fixed",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "none",
          borderRadius: 0,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          boxShadow: "none",
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "none",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
