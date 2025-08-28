import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      light: "#696969",
      main: "#696969",
      dark: "#696969",
      contrastText: "#000000",
    },
    secondary: {
      light: "#696969",
      main: "#C0C0C0",
      dark: "#696969",
      contrastText: "#000000",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      light: "#696969",
      main: "#696969",
      dark: "#696969",
      contrastText: "#000000",
    },
    secondary: {
      light: "#696969",
      main: "#C0C0C0",
      dark: "#696969",
      contrastText: "#000000",
    },
  },
});

export { lightTheme, darkTheme };
