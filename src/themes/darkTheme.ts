import { defaultDarkTheme } from "react-admin";
import { deepmerge } from "@mui/utils";

export const darkTheme = deepmerge(defaultDarkTheme, {
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#ce93d8",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
        },
      },
    },
  },
});
