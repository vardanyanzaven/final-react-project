import { ThemeProvider } from "@material-ui/core";
import { Typography, createTheme } from "@material-ui/core";
import dayjs from "dayjs";
import { useAuth } from "../../hooks/useAuth";
import { uuidv4 } from "@firebase/util";
import { Box, Grid } from "@mui/material";

const userHistTheme = createTheme({
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
const UserHistory = () => {
  const { userInfo } = useAuth();
  const { purchases } = userInfo;

  return (
    <ThemeProvider theme={userHistTheme}>
      <Box sx={{ padding: "50px 0", minHeight: "100vh" }}>
        <Grid container spacing={6} sx={{ paddingInline: "50px" }}>
          {purchases.map((car) => {
            return (
              <Grid item key={uuidv4()} xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    bgcolor: "white",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    borderRadius: "5px",
                    p: "1rem 1rem 1rem 3rem",
                  }}
                >
                  <Typography variant="h6">
                    Car Brand:{" "}
                    <span style={{ color: "#F2B90D" }}>{car.carBrand}</span>
                  </Typography>
                  <Typography variant="h6">
                    Car Model:{" "}
                    <span style={{ color: "#F2B90D" }}>{car.carModel}</span>
                  </Typography>
                  <Typography variant="h6">
                    Production Year:{" "}
                    <span style={{ color: "#F2B90D" }}>{car.carProdYear}</span>
                  </Typography>
                  <Typography variant="h6">
                    Price:{" "}
                    <span style={{ color: "#F2B90D" }}>
                      ${car.price.toLocaleString()}
                    </span>
                  </Typography>
                  <Typography variant="h6">
                    Purchase date:{" "}
                    <span style={{ color: "#F2B90D" }}>
                      {dayjs(car.purchaseDate).format("MMM DD, YYYY hh:mm A")}
                    </span>
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
export default UserHistory;
