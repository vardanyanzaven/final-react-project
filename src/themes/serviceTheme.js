import { createTheme } from "@material-ui/core";

const ServiceTheme = createTheme({
  components: {
    Booking: {
      styleOverrides: {
        root: {},
      },
    },
  },
  typography: {
    fontFamily: ["Quicksand", "IBM Plex Sans", "Roboto", "sans-serif"].join(
      ","
    ),
  },

  palette: {
    gold: {
      light: "#FFC30F",
      main: "#F2B90D",
      dark: "#E8AE00",
      contrastText: "#007292",
    },
  },
});

export default ServiceTheme;
