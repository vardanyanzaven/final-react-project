import { createTheme } from "@material-ui/core";

const ServiceTheme = createTheme({
  components: {
    Booking: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

export default ServiceTheme;
