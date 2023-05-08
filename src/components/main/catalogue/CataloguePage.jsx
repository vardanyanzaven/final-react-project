import React, { useState, useEffect, useRef } from "react";
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
import FilterSort from "./FilterSort";
import { SORT_OPTIONS, FILTER_OPTIONS } from "../../../constants/common";
import { useDispatch, useSelector } from "react-redux";
import CatalogueTheme from "../../../themes/CatalogueTheme";
import { setCatalogue } from "../../../store/slicers/catalogueSlice";


const CataloguePage = ({ setActiveLinkId }) => {
  
  // Redux
  const dispatch = useDispatch();

  // Logic for setting catalogue tab button as active
  useEffect(() => {
    setActiveLinkId("catalogue");
    dispatch(setCatalogue((arr) => null));
    return () => setActiveLinkId(null);
  }, []);

  // Filter and sort select values
  const [sortValue, setSortValue] = useState(SORT_OPTIONS[0]);
  const [filterValue, setFilterValue] = useState(
    FILTER_OPTIONS[0]
  );
  const changeOption = (type, value) =>
    type === "sort"
      ? setSortValue(value)
      : type === "filter"
      ? setFilterValue(value)
      : console.log("Error when setting sort/filter value");

  // Catalogue cars data
  const { cars } = useSelector((state) => state.catalogue);

  // Page height
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => setHeight(ref.current.clientHeight), []);

  // Search field input value
  const [searchInputVal, setSearchInputVal] = useState("");

  return (
    <ThemeProvider theme={CatalogueTheme}>
      <Box ref={ref}>
        <AppBar
          position="static"
          sx={{ height: 75, mt: 10, mb: height + 20, background: "#192026" }}
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
                  onChange={(e) => setSearchInputVal(e.target.value)}
                  />
                <SearchIcon
                  sx={{
                    cursor: "pointer",
                    transition: "color 0.1s",
                    "&:hover": { color: "#f2b90d" },
                  }}
                  // onClick={() => dispatch(setCatalogue((arr) => arr.filter(car => car.carBrand.includes(searchInputVal))))}
                />
              </Box>
              <FilterSort
                sortValue={sortValue}
                filterValue={filterValue}
                changeOption={changeOption}
              />
            </Toolbar>
            <Box>
              <Grid container spacing={3} sx={{ mt: 6 }}>
                {cars.map((car) => (
                  <Grid item key={car.id} xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ maxWidth: { xs: "280px", sm: "450px" } }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={car.photoURL}
                        alt="Car 1"
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent>
                        <Typography variant="h6">
                          {car.carBrand} {car.carModel}({car.carProdYear})
                        </Typography>
                        <Typography sx={{ color: "#F2A800" }}>
                          ${car.price.toLocaleString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default CataloguePage;
