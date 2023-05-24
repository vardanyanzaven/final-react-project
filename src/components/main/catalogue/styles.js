export const catalogueStyles = {
  appBar: { height: 75, mt: 10, background: "#192026" },
  toolBar: {
    display: "flex",
    pt: { xs: 1.2, sm: 0.7 },
    justifyContent: "space-between",
    gap: 2,
  },
  mainBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #f2b90d",
    borderRadius: "5px",
    color: "white",
    pr: "8px",
    width: { xs: "50%", sm: "40%", md: "25%" },
  },
  searchInput: {
    color: "white",
    width: "100%",
    pl: "10px",
    pr: "10px",
  },
  searchIcon: {
    cursor: "pointer",
    transition: "color 0.1s",
    "&:hover": { color: "#f2b90d" },
  },
};

export const filterSortStyles = {
  sortButton: {
    // color: "#F2B90D",
    border: "1px solid #F2B90D",
    borderRadius: "10px",
    p: "7px 15px",
    display: { xs: "none", sm: "flex" },
  },
  sortTpgh: {
    display: { xs: "none", md: "inline" },
    fontSize: "16px",
    mr: 1,
  },
  filterButton: {
    border: "1px solid #F2B90D",
    borderRadius: "10px",
    p: "7px 15px",
    fontSize: { xs: "14px", sm: "16px" },
    display: { xs: "none", sm: "flex" },
  },
  filterTpgh: {
    display: { xs: "none", md: "inline" },
    fontSize: { xs: "16px" },
    mr: 1,
  },
};
