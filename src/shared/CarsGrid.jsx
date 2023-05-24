import { db } from "../firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "@firebase/firestore";
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
  Tooltip,
  Typography,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { openDialog } from "../store/slicers/dialogSlice";
import { changeUserInfo } from "../store/slicers/userSlice";
// doc(db, "catalogueCars", carId)

const CarsGrid = ({ carsList }) => {
  const dispatch = useDispatch();
  const { isAuth, id, userInfo } = useAuth();
  const { savedCars } = userInfo;

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

  return (
    <Box sx={{ width: "100%", mt: { xs: 5, sm: 7, md: 10 } }}>
      <Grid
        container
        rowSpacing={{ xs: 2, sm: 4 }}
        columnSpacing={{ xs: 0, sm: 2, md: 3 }}
        sx={{ mt: 6, p: "0 50px" }}>
        {carsList.map((car) => (
          <Grid item key={car.id} xs={12} sm={12} md={6} lg={6}>
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
                      <span style={{ color: "black" }}>Brand: </span>{" "}
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
                      <span style={{ color: "black" }}>Production year: </span>
                      {car.carProdYear}
                    </Typography>
                    <Typography sx={{ color: "#FFBD00", fontSize: "18px" }}>
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
                    <Button
                      // color="gold"
                      variant="outlined"
                      sx={{
                        border: "2px solid",
                        fontWeight: "bold",
                        "&:hover": { border: "2px solid" },
                        fontSize: "13px",
                      }}
                      onClick={() => !isAuth && openSignIn()}>
                      Buy Now
                    </Button>
                    <Tooltip
                      title='Add or remove from "Saved"'
                      placement="bottom">
                      <IconButton
                        // color="gold"
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
                    // color="gold"
                    variant="outlined"
                    sx={{
                      border: "2px solid",
                      fontWeight: "bold",
                      "&:hover": { border: "2px solid" },
                      fontSize: "12px",
                    }}
                    onClick={() => !isAuth && openSignIn()}>
                    Buy Now
                  </Button>
                  <Tooltip
                    title='Add or remove from "Saved"'
                    placement="bottom">
                    <IconButton
                      // color="gold"
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
  );
};

export default CarsGrid;
