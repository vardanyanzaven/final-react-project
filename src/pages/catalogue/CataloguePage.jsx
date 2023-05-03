import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  InputBase,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CatalogueTheme from "../../themes/catalogueTheme";
import FilterSort from "./FilterSort";
import { SORT_OPTIONS, FILTER_OPTIONS } from "../../constants/common";
import { useSelector } from "react-redux";

// const selectMenu = styled(Menu)

const CataloguePage = ({ setActiveLinkId }) => {
  // Logic for setting catalogue tab button as active
  useEffect(() => {
    setActiveLinkId("catalogue");
    return () => setActiveLinkId(null);
  }, []);

  // Filter and sort select values
  const [sortValue, setSortValue] = useState(Object.entries(SORT_OPTIONS)[0]);
  const [filterValue, setFilterValue] = useState(
    Object.entries(FILTER_OPTIONS)[0]
  );
  const changeOption = (type, value) =>
    type === "sort"
      ? setSortValue(value)
      : type === "filter"
      ? setFilterValue(value)
      : console.log("Error when setting sort/filter value");

  // Catalogue cars data
  const { cars } = useSelector((state) => state.catalogue);
  console.log(cars);

  return (
    <ThemeProvider theme={CatalogueTheme}>
        <AppBar
          position="static"
          sx={{ height: 75, mt: 10, background: "#192026" }}
        >
          <Container>
            <Toolbar
              sx={{
                pt: 0.7,
                pl: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "2px 10px 2px 15px",
                  border: "1px solid #f2b90d",
                  borderRadius: "5px",
                  color: "white",
                  width: "25%",
                }}
              >
                <InputBase
                  type="text"
                  placeholder="Search..."
                  sx={{
                    color: "white",
                    flexGrow: 1,
                    // onChange-y req a uxarkum fb
                  }}
                />
                <SearchIcon />
              </Box>
              <FilterSort
                sortValue={sortValue}
                filterValue={filterValue}
                changeOption={changeOption}
              />
            </Toolbar>
            <Grid container spacing={3} sx={{ mt: 6 }}>
              {cars.map(car => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card sx={{ maxWidth: {xs: "280px", sm: "450px"} }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={car.photoURL}
                      alt="Car 1"
                      sx={{ objectFit: "contain" }}
                    />
                    <CardContent>
                      <Typography>
                        {car.carBrand} {car.carModel}(
                        {car.carProdYear})
                      </Typography>
                      <Typography>
                        ${car.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

              ))}
            </Grid>
          </Container>
        </AppBar>
    </ThemeProvider>
  );
};

export default CataloguePage;
