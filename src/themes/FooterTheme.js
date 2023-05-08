import { createTheme } from "@mui/material";
import styled from "styled-components";

const FooterTheme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "white",
          transition: "color 0.15s",
          "&:hover": {
            color: "#F2B90D",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: ["IBM Plex Sans", "Roboto", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 475,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const ContainerBox = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#192026",
  height: "80px",
  // marginTop: "1000px",
  padding: "15px 50px",
  [FooterTheme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
});

export { ContainerBox, FooterTheme };
