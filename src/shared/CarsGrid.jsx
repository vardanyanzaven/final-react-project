import { db } from "../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "@firebase/firestore";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { openDialog } from "../store/slicers/dialogSlice";
import { changeUserInfo } from "../store/slicers/userSlice";
import { carsGridStyles } from "./styles";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { PayPal } from "../components/main/services_tab/PayPal";
import { changeMessage } from "../store/slicers/statusSlice";
import { SUCCESS_MESSAGE } from "../constants/common";

const carsGridTheme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color: "#F2B90D",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#F2B90D",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#F2B90D",
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&:focus": {
            backgroundColor: "#F2B90D",
          },
          "&.Mui-selected": {
            backgroundColor: "#F2B90D",
            "&.Mui-selected:focus": {
              backgroundColor: "#F2B90D",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#F2B90D",
            },
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
  palette: {
    gold: {
      light: "#FFC30F",
      main: "#F2B90D",
      dark: "#E8AE00",
      contrastText: "#007292",
    },
  },
});

const CarsGrid = ({ carsList, exitFromProfile }) => {
  const dispatch = useDispatch();
  const { isAuth, id, userInfo } = useAuth();
  const { savedCars, purchases } = userInfo;
  const [isBuyNowClicked, setIsBuyNowClicked] = useState(false);
  const [selectedCar, setSelectedCar] = useState();
  const [pickupDate, setPickupDate] = useState(dayjs());

  const handleBuyNowClick = (car) => {
    setIsBuyNowClicked(true);
    setSelectedCar(car);
  };

  const handleSaveClick = async (carId) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, {
        savedCars: savedCars.includes(carId)
          ? arrayRemove(doc(db, "catalogueCars", carId))
          : arrayUnion(doc(db, "catalogueCars", carId)),
      });

      const isIdInSavedCars = savedCars.includes(carId);
      dispatch(
        changeUserInfo({
          ...userInfo,
          savedCars: isIdInSavedCars
            ? savedCars.filter((cId) => cId !== carId)
            : [...savedCars, carId],
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const openSignIn = () => {
    dispatch(
      openDialog({
        isSignInOpen: true,
        isSignUpOpen: false,
      })
    );
  };

  const handlePurchaseClick = async (selectedCar, purchaseDate) => {
    try {
      const userRef = doc(db, "users", id);
      const { id: carId, carBrand, carProdYear, carModel, price } = selectedCar;
      const newPurchase = {
        id: carId,
        carBrand,
        carModel,
        price,
        carProdYear,
        pickupDate: pickupDate.valueOf(),
        purchaseDate: purchaseDate.valueOf(),
      };
      await updateDoc(userRef, { purchases: arrayUnion({ ...newPurchase }) });
      dispatch(
        changeUserInfo({
          ...userInfo,
          purchases: [...purchases, { ...newPurchase }].sort(
            (a, b) => b.purchaseDate - a.purchaseDate
          ),
        })
      );
      setIsBuyNowClicked(false);
      setPickupDate(dayjs());
      dispatch(changeMessage(SUCCESS_MESSAGE.purchaseSuccess));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemeProvider theme={carsGridTheme}>
      {!isBuyNowClicked ? (
        <Box sx={carsGridStyles.mainBox}>
          <Grid
            container
            rowSpacing={{ xs: 2, sm: 4 }}
            columnSpacing={{ xs: 0, sm: 2, md: 3 }}
            sx={{ mt: 6, p: "0 50px" }}>
            {carsList.map((car) => (
              <Grid
                item
                key={car.id}
                xs={12}
                sm={12}
                md={exitFromProfile ? 12 : 6}
                lg={exitFromProfile ? 12 : 6}>
                <Paper sx={{ height: "100%" }}>
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      margin: "0 auto",
                      display: { xs: "none", sm: "flex" },
                      gap: 2,
                    }}>
                    <CardMedia
                      component="img"
                      height="245"
                      image={car.photoURL}
                      alt={`${car.carBrand} ${car.carModel}`}
                      sx={{ objectFit: "cover", width: "58%" }}
                    />
                    <Box
                      sx={{
                        width: "35%",
                        display: "flex",
                        flexDirection: "column",
                        pt: 1,
                      }}>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.8,
                        }}>
                        <Typography
                          sx={{ color: "#FFBD00", fontSize: "18px" }}
                          noWrap>
                          <span style={{ color: "black" }}>Brand: </span>
                          {car.carBrand}
                        </Typography>
                        <Typography
                          sx={{ color: "#FFBD00", fontSize: "18px" }}
                          noWrap>
                          <span style={{ color: "black" }}>Model: </span>
                          {car.carModel}
                        </Typography>
                        <Typography
                          sx={{ color: "#FFBD00", fontSize: "18px" }}
                          noWrap>
                          <span style={{ color: "black" }}>
                            Production year:{" "}
                          </span>
                          {car.carProdYear}
                        </Typography>
                        <Typography
                          sx={{ color: "#FFBD00", fontSize: "18px" }}
                          noWrap>
                          <span style={{ color: "black" }}>Price</span>: $
                          {car.price.toLocaleString()}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          width: "100%",
                          ml: 1,
                          display: "flex",
                          justifyContent: "space-between",
                        }}>
                        {!exitFromProfile && (
                          <Button
                            color="gold"
                            variant="outlined"
                            sx={{
                              border: "2px solid",
                              fontWeight: "bold",
                              "&:hover": { border: "2px solid" },
                              fontSize: "13px",
                            }}
                            onClick={() =>
                              isAuth ? handleBuyNowClick(car) : openSignIn()
                            }>
                            Buy Now
                          </Button>
                        )}
                        {!exitFromProfile && (
                          <Tooltip
                            title='Add or remove from "Saved"'
                            placement="bottom">
                            <IconButton
                              color="gold"
                              sx={{ mr: 1 }}
                              onClick={() =>
                                isAuth ? handleSaveClick(car.id) : openSignIn()
                              }>
                              {savedCars?.includes(car.id) ? (
                                <BookmarkIcon />
                              ) : (
                                <BookmarkBorderIcon />
                              )}
                            </IconButton>
                          </Tooltip>
                        )}
                      </CardActions>
                    </Box>
                  </Card>
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      margin: "0 auto",
                      display: { sm: "none" },
                      pb: 1,
                    }}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={car.photoURL}
                      alt={`${car.carBrand} ${car.carModel}`}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography sx={{ fontSize: "15px" }}>
                        {car.carBrand} {car.carModel} ({car.carProdYear})
                      </Typography>
                      <Typography sx={{ fontSize: "15px", color: "#F2A800" }}>
                        ${car.price.toLocaleString()}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        width: "93%",
                        ml: 1,
                        display: "flex",
                        justifyContent: "space-between",
                      }}>
                      <Button
                        color="gold"
                        variant="outlined"
                        sx={{
                          border: "2px solid",
                          fontWeight: "bold",
                          "&:hover": { border: "2px solid" },
                          fontSize: "12px",
                        }}
                        onClick={() =>
                          isAuth ? handleBuyNowClick(car) : openSignIn()
                        }>
                        Buy Now
                      </Button>
                      <Tooltip
                        title='Add or remove from "Saved"'
                        placement="bottom">
                        <IconButton
                          color="gold"
                          sx={{ mr: 1 }}
                          onClick={() =>
                            isAuth ? handleSaveClick(car.id) : openSignIn()
                          }>
                          {savedCars?.includes(car.id) ? (
                            <BookmarkIcon />
                          ) : (
                            <BookmarkBorderIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            maxWidth: "550px",
            gap: 2,
            margin: "5rem auto 0 auto",
            padding: "3rem",
          }}
          elevation={5}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}>
            Buy Now
          </Typography>
          <Typography sx={{ fontSize: "20px" }}>
            Selected car:
            <span style={{ color: "#F2B90D" }}>
              {selectedCar.carBrand} {selectedCar.carModel} (
              {selectedCar.carProdYear})
            </span>
          </Typography>
          <Typography sx={{ fontSize: "20px" }}>
            Price:{" "}
            <span style={{ color: "#F2B90D" }}>
              ${selectedCar.price.toLocaleString()}
            </span>
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disablePast
              value={pickupDate}
              onChange={(newVal) => setPickupDate(newVal)}
              label="Select the pick-up date"
              slotProps={{
                textField: {
                  helperText: "MM/DD/YYYY",
                },
              }}
            />
          </LocalizationProvider>
          <PayPal value={selectedCar.price} />
          <Button
            color="gold"
            variant="outlined"
            sx={{
              color: "#F2B90D",
              border: "2px solid",
              fontWeight: "bold",
              "&:hover": { border: "2px solid #F2B90D" },
            }}
            onClick={() => setIsBuyNowClicked(false)}>
            Cancel
          </Button>
          <Button
            color="gold"
            variant="contained"
            sx={{
              color: "white",
              border: "2px solid #F2B90D",
              fontWeight: "bold",
              "&:hover": { border: "2px solid #F2B90D" },
            }}
            onClick={() => handlePurchaseClick(selectedCar, dayjs())}>
            Purchase
          </Button>
        </Paper>
      )}
    </ThemeProvider>
  );
};
export default CarsGrid;
