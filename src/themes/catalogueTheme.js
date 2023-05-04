import { createTheme } from "@material-ui/core";

const CatalogueTheme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        root: {
          "& .MuiMenu-paper": {
            background: "#192026",
            color: "white",
            width: "300px"
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          pl: "24px",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Quicksand", "IBM Plex Sans", "Roboto", "sans-serif"].join(
      ","
    ),
  },
});

export default CatalogueTheme;