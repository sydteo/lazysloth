import { createTheme } from "@mui/material/styles";
import colours from "./colours";
import { hover } from "@testing-library/user-event/dist/hover";

const theme = createTheme({
  palette: {
    primary: {
      main: colours.green,
    },
    secondary: {
      main: colours.pink,
    },
    background: {
      main: colours.green,
    },
    text: {
      disabled: colours.black,
    },
  },
  divider: {
    background: colours.black,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          ":hover": {
            background: colours.orange,
          },
        },
      },
    },
  },
});

export default theme;
