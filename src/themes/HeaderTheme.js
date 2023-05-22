import { createTheme } from "@mui/material";

const HeaderTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          textTransform: "capitalize",
        },
      },
      defaultProps: {
        disableRipple: true,
      },
      variants: [
        {
          props: { variant: "navbar" },
          style: {
            color: "white",
            "&:hover": {
              background: "rgb(37, 47, 57)",
            },
            "&:active": {
              background: "rgba(215, 182, 93, 0.3)",
              color: "black",
            },
            "&.active-navbar-btn": {
              background: "#F2B90D",
              color: "black",
            },
          },
        },
        {
          props: { variant: "login" },
          style: {
            color: "#D7B65D",
            border: "2px solid #F1B500",
            "&:hover": {
              background: "rgba(215, 182, 93, 0.3)",
              borderColor: "transparent",
            },
          },
        },
        {
          props: { variant: "signup" },
          style: {
            background: "#F2B90D",
            border: "2px solid #F2B90D",
            color: "black",
            "&:hover": {
              background: "rgb(37,47,57)",
              borderColor: "transparent",
              color: "#F2B90D",
            },
          },
        },
      ],
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.nav-active": {
            color: "#F2B90D",
          },
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          color: "black",
          transition: "color 0.2s",
          "&:hover": {
            color: "#F2B90D",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: ["Quicksand", "IBM Plex Sans", "Roboto", "sans-serif"].join(
      ","
    ),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default HeaderTheme;
