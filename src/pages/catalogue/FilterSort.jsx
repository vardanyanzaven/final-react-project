import React, { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { SORT_OPTIONS, FILTER_OPTIONS } from "../../constants/common";

const FilterSort = ({ sortValue, filterValue, changeOption }) => {
  // Logic for opening filter and sort menus
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const sortOpen = !!sortAnchorEl;
  const filterOpen = !!filterAnchorEl;
  const [activeSortOpt, setActiveSortOpt] = useState(sortValue[0]);
  const [activeFilterOpt, setActiveFilterOpt] = useState(filterValue[0]);
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

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button
        id="sort-by-btn"
        aria-controls={sortOpen ? "sort-by-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={sortOpen ? "true" : undefined}
        onClick={handleSortClick}
        startIcon={<SortIcon />}
      >
        <Typography sx={{ display: { xs: "none", md: "inline" }, mr: 1 }}>
          Sort By:
        </Typography>
        {`${sortValue ? sortValue[1] : ""}`}
      </Button>
      {/* xs-i hamar IconButton-ov kareli a sarqel */}
      <Button
        id="filter-btn"
        aria-controls={filterOpen ? "filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={filterOpen ? "true" : undefined}
        onClick={handleFilterClick}
        startIcon={<FilterAltIcon />}
      >
        <Typography sx={{ display: { xs: "none", md: "inline" }, mr: 1 }}>
          Filter:
        </Typography>
        {filterValue ? filterValue[1] : ""}
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
        {Object.entries(SORT_OPTIONS).map((opt) => (
          <MenuItem
            key={opt[0]}
            onClick={() => {
              changeOption("sort", opt);
              handleClose("sort");
              setActiveSortOpt(opt[0]);
            }}
            className={activeSortOpt === opt[0] ? "active-opt" : ""}
          >
            {activeSortOpt === opt[0] ? <SortIcon sx={{ mr: 1 }} /> : ""}
            {opt[1]}
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
        {Object.entries(FILTER_OPTIONS).map((opt) => (
          <MenuItem
            key={opt[0]}
            onClick={() => {
              changeOption("filter", opt);
              handleClose("filter");
              setActiveFilterOpt(opt[0]);
            }}
            className={activeFilterOpt === opt[0] ? "active-opt" : ""}
          >
            {activeFilterOpt === opt[0] ? <FilterAltIcon sx={{ mr: 1 }} /> : ""}
            {opt[1]}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default FilterSort;
