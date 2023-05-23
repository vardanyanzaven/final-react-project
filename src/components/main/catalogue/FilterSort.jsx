import React, { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { SORT_OPTIONS, FILTER_OPTIONS } from "../../../constants/common";
import { useDispatch, useSelector } from "react-redux";
import {
  setCatalogue,
  setFetchVal,
} from "../../../store/slicers/catalogueSlice";
import { ThemeProvider } from "styled-components";
import catalogueTheme from "../../../themes/catalogueTheme";

const FilterSort = ({
  activeSortOpt,
  activeFilterOpt,
  setActiveSortOpt,
  setActiveFilterOpt,
  sortValue,
  setSortValue,
  filterValue,
  setFilterValue,
  changeOption,
}) => {
  // Logic for opening filter and sort menus
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const sortOpen = !!sortAnchorEl;
  const filterOpen = !!filterAnchorEl;
  const handleSortClick = (e) => {
    setSortAnchorEl(e.currentTarget);
  };
  const handleFilterClick = (e) => {
    setFilterAnchorEl(e.currentTarget);
  };
  const handleClose = (el) => {
    el === "sort"
      ? setSortAnchorEl(null)
      : el === "filter"
      ? setFilterAnchorEl(null)
      : console.log("Error when opening sort/filter menu");
  };

  // Redux
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={catalogueTheme}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <IconButton
          color="gold"
          id="sort-by-btn"
          aria-controls={sortOpen ? "sort-by-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={sortOpen ? "true" : undefined}
          onClick={handleSortClick}
          size="large"
          sx={{
            display: { xs: "flex", sm: "none" },
          }}
        >
          <SortIcon />
        </IconButton>
        <Button
          color="gold"
          id="sort-by-btn"
          aria-controls={sortOpen ? "sort-by-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={sortOpen ? "true" : undefined}
          onClick={handleSortClick}
          startIcon={<SortIcon />}
          sx={{
            // color: "#F2B90D",
            border: "1px solid #F2B90D",
            borderRadius: "10px",
            p: "7px 15px",
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Typography
            sx={{
              display: { xs: "none", md: "inline" },
              fontSize: "16px",
              mr: 1,
            }}
          >
            Sort By:
          </Typography>
          <Typography
            sx={{
              display: { xs: "none", sm: "inline" },
            }}
          >
            {`${sortValue ? sortValue.value : ""}`}
          </Typography>
        </Button>
        {/* xs-i hamar IconButton-ov kareli a sarqel */}
        <IconButton
          color="gold"
          id="filter-btn"
          aria-controls={filterOpen ? "filter-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={filterOpen ? "true" : undefined}
          onClick={handleFilterClick}
          size="large"
          sx={{ display: { xs: "flex", sm: "none" } }}
        >
          <FilterAltIcon />
        </IconButton>
        <Button
          color="gold"
          id="filter-btn"
          aria-controls={filterOpen ? "filter-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={filterOpen ? "true" : undefined}
          onClick={handleFilterClick}
          startIcon={<FilterAltIcon />}
          sx={{
            border: "1px solid #F2B90D",
            borderRadius: "10px",
            p: "7px 15px",
            fontSize: { xs: "14px", sm: "16px" },
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Typography
            sx={{
              display: { xs: "none", md: "inline" },
              fontSize: { xs: "16px" },
              mr: 1,
            }}
          >
            Filter:
          </Typography>
          <Typography
            sx={{
              display: { xs: "none", sm: "inline" },
            }}
          >
            {filterValue.value}
          </Typography>
        </Button>
        <Menu
          id="sort-by-menu"
          aria-labelledby="sort-by-btn"
          anchorEl={sortAnchorEl}
          open={sortOpen}
          onClose={() => handleClose("sort")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {SORT_OPTIONS.map((opt) => (
            <MenuItem
              key={opt.value}
              onClick={() => {
                changeOption("sort", opt);
                handleClose("sort");
                setActiveSortOpt(opt.value);
                dispatch(setFetchVal(["sortVal", opt.sortCondition]));
                dispatch(setCatalogue("sort"));
                setFilterValue(FILTER_OPTIONS[0]);
                setActiveFilterOpt(FILTER_OPTIONS[0].value);
                setActiveFilterOpt(FILTER_OPTIONS[0].value);
                dispatch(setFetchVal(["filterVal", null]));
              }}
              className={activeSortOpt === opt.value ? "active-opt" : ""}
            >
              {activeSortOpt === opt.value && <SortIcon sx={{ mr: 1 }} />}
              {opt.value}
            </MenuItem>
          ))}
        </Menu>
        <Menu
          id="filter-menu"
          aria-labelledby="filter-btn"
          anchorEl={filterAnchorEl}
          open={filterOpen}
          onClose={() => handleClose("filter")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {FILTER_OPTIONS.map((opt) => (
            <MenuItem
              key={opt.value}
              onClick={() => {
                changeOption("filter", opt);
                handleClose("filter");
                setActiveFilterOpt(opt.value);
                dispatch(setFetchVal(["filterVal", opt.filterCondition]));
                dispatch(setCatalogue("filter"));
                setSortValue(SORT_OPTIONS[0]);
                setActiveSortOpt(SORT_OPTIONS[0].value);
                dispatch(setFetchVal(["sortVal", null]));
              }}
              className={activeFilterOpt === opt.value ? "active-opt" : ""}
            >
              {activeFilterOpt === opt.value && (
                <FilterAltIcon sx={{ mr: 1 }} />
              )}
              {opt.value}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </ThemeProvider>
  );
};

export default FilterSort;
