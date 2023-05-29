export const headStyles = {
  toolBarStyle: {
    display: "flex",
    alignItems: "center",
    height: 80,
  },
  favIcon: {
    width: { xs: "40px", sm: "70px" },
    height: { xs: "40px", sm: "70px" },
    borderRadius: "50%",
  },
  title1: {
    fontSize: { xs: 15, sm: 30 },
    color: "#F2B90D",
    bgcolor: "#161617",
    p: "0 5px",
    borderTopLeftRadius: "20px",
  },
  title2: {
    display: "flex",
    alignItems: "center",
    fontSize: { xs: 15, sm: 30 },
    p: "0 5px",
    color: "#161617",
    bgcolor: "#F2B90D",
    borderBottomRightRadius: "20px",
    mr: 1,
  },
  tabs: {
    display: { xs: "none", md: "flex" },
    alignItems: "center",
    justifyContent: "space-evenly",
    flexGrow: 1,
  },
  mainBox: { pb: { xs: 0, sm: 1 }, flexGrow: { xs: 1, md: 0 } },
};

export const dropMenu = {
  menuItem: {
    transition: "background 0.1s",
    color: "white",
    "&:hover": {
      background: "rgb(37, 47, 57)",
    },
  },
  tabFonts: { fontSize: { sm: 22, xs: 17 } },
  mainMenu: { display: { xs: "flex", md: "none" }, flexGrow: 1, ml: -1 },
};

export const userSettings = {
  mainBox: {
    display: { lg: "flex", sm: "block" },
    justifyContent: "space-evenly",
    alignItems: "center",
    m: 3,
  },
};
