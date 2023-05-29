import React, { useState, useEffect } from "react";
import { AppBar, Box, Container } from "@mui/material";
import { InputBase, ThemeProvider, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import FilterSort from "./FilterSort";
import { SORT_OPTIONS, FILTER_OPTIONS } from "../../../constants/common";
import { setCatalogue } from "../../../store/slicers/catalogueSlice";
import { setFetchVal } from "../../../store/slicers/catalogueSlice";
import CarsGrid from "../../../shared/CarsGrid";
import CatalogueTheme from "../../../themes/CatalogueTheme";
import { catalogueStyles } from "./styles";

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
      <Box sx={{ minHeight: "100vh", marginBottom: "10px" }}>
        <AppBar position="static" sx={catalogueStyles.appBar}>
          <Container>
            <Toolbar sx={catalogueStyles.toolBar}>
              <Box sx={catalogueStyles.mainBox}>
                <InputBase
                  type="text"
                  sx={catalogueStyles.searchInput}
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
                  sx={catalogueStyles.searchIcon}
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
        <CarsGrid carsList={cars} />
      </Box>
    </ThemeProvider>
  );
};

export default CataloguePage;
