import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Box,
  Container,
  InputBase,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterSort from "./FilterSort";
import { SORT_OPTIONS, FILTER_OPTIONS } from "../../../constants/common";
import { useDispatch, useSelector } from "react-redux";
import {
  setCatalogue,
  setFetchVal,
} from "../../../store/slicers/catalogueSlice";

import CarsGrid from "../../../shared/CarsGrid";
import CatalogueTheme from "../../../themes/CatalogueTheme";

const CataloguePage = ({ setActiveLinkId }) => {
  // Redux
  const dispatch = useDispatch();

  // Logic for setting catalogue tab button as active
  useEffect(() => {
    setActiveLinkId("catalogue");
    dispatch(setCatalogue());
    return () => setActiveLinkId(null);
  }, []);
  // Filter and sort select values
  const [sortValue, setSortValue] = useState(SORT_OPTIONS[0]);
  const [filterValue, setFilterValue] = useState(FILTER_OPTIONS[0]);
  const changeOption = (type, value) =>
    type === "sort"
      ? setSortValue(value)
      : type === "filter"
      ? setFilterValue(value)
      : console.log("Error when setting sort/filter value");

  // Active filter and sort options
  const [activeSortOpt, setActiveSortOpt] = useState(sortValue.value);
  const [activeFilterOpt, setActiveFilterOpt] = useState(filterValue.value);

  // Catalogue cars data
  const { cars } = useSelector((state) => state.catalogue);

  // Search field input value
  const [searchInputVal, setSearchInputVal] = useState("");
  const [lastSearch, setLastSearch] = useState("");

  // Helper functions for handling search input dispatch
  const handleSearch = () => {
    // Handling redux
    dispatch(setFetchVal(["searchVal", searchInputVal]));
    dispatch(setFetchVal(["sortVal", null]));
    dispatch(setFetchVal(["filterVal", null]));
    dispatch(setCatalogue("search"));

    // Setting filter/sort default values
    setSortValue(SORT_OPTIONS[0]);
    setFilterValue(FILTER_OPTIONS[0]);
    setActiveSortOpt(SORT_OPTIONS[0].value);
    setActiveFilterOpt(FILTER_OPTIONS[0].value);

    setLastSearch(searchInputVal);
    setSearchInputVal("");
  };

  return (
    <ThemeProvider theme={CatalogueTheme}>
      <Box sx={{ minHeight: "100vh"}}>
        <AppBar
          position="static"
          sx={{ height: 75, mt: 10, background: "#192026" }}
        >
          <Container>
            <Toolbar
              sx={{
                display: "flex",
                pt: {xs: 1.2, sm: 0.7},
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #f2b90d",
                  borderRadius: "5px",
                  color: "white",
                  pr: "8px",
                  width: { xs: "50%", sm: "40%", md: "25%" },
                }}
              >
                <InputBase
                  type="text"
                  sx={{
                    color: "white",
                    width: "100%",
                    pl: "10px",
                    pr: "10px"
                  }}
                  placeholder={
                    lastSearch === ""
                      ? "Search..."
                      : `Last searched for "${lastSearch}"`
                  }
                  value={searchInputVal}
                  onChange={(e) => setSearchInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                />
                <SearchIcon
                  sx={{
                    cursor: "pointer",
                    transition: "color 0.1s",
                    "&:hover": { color: "#f2b90d" },
                  }}
                  onClick={() => {
                    handleSearch();
                  }}
                />
              </Box>
              <FilterSort
                sortValue={sortValue}
                filterValue={filterValue}
                activeSortOpt={activeSortOpt}
                setActiveSortOpt={setActiveSortOpt}
                activeFilterOpt={activeFilterOpt}
                setActiveFilterOpt={setActiveFilterOpt}
                changeOption={changeOption}
                setSortValue={setSortValue}
                setFilterValue={setFilterValue}
              />
            </Toolbar>
          </Container>
        </AppBar>
        <CarsGrid carsList={cars}/>
      </Box>
    </ThemeProvider>
  );
};

export default CataloguePage;