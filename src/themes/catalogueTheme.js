import { Menu, createTheme, styled } from "@material-ui/core";
import { Button } from "@mui/material";

const CatalogueTheme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        root: {
          "& .MuiMenu-paper": {
            minWidth: "175px",
          },

        }
      }
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

export const FilterSortBtn = styled(Button)({
  color: "#F2B90D",
  border: "1px solid #F2B90D",
  borderRadius: "10px",
  p: "7px 15px",
  fontSize: {xs: "14px", sm: "16px"}
});

export default CatalogueTheme;