import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { HEADER_TAB_LIST } from "../../constants/common";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavbarMenu = styled(Menu)({
  "& .MuiMenu-paper": {
    color: "white",
    background: "#192026",
    width: "100%",
  },
});

const DropdownMenu = () => {
  const [isNavOpened, setIsNavOpened] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const openNavMenu = (e) => {
    setIsNavOpened(!isNavOpened);
    setAnchorElNav(e.currentTarget);
  };
  const closeNavMenu = () => {
    setIsNavOpened(!isNavOpened);
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
      <IconButton
        className={isNavOpened ? "nav-active" : ""}
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={openNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <NavbarMenu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={!!anchorElNav}
        onClose={closeNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
          flexGrow: 1,
        }}
      >
        {HEADER_TAB_LIST.map((tab) => {
          if (tab === "contact us") {
            return (
              <MenuItem
                key={tab.split(" ").join("-")}
                id={tab}
                onClick={closeNavMenu}
              >
                <Typography
                  sx={{
                    fontSize: { sm: 24, xs: 15 },
                    transition: "background 0.1s",
                    "&:hover": {
                      background: "rgb(37, 47, 57)",
                    },
                  }}
                  variant="h5"
                  noWrap
                >
                  {tab}
                </Typography>
              </MenuItem>
            );
          }
          return (
            <NavLink
              key={tab.split(" ").join("-")}
              to={tab}
              className="navbar-link"
            >
              <MenuItem
                onClick={closeNavMenu}
                sx={{
                  borderBottom: "2px dotted #F2B90D",
                  transition: "background 0.1s",
                  "&:hover": {
                    background: "rgb(37, 47, 57)",
                  },
                }}
              >
                <Typography
                  sx={{ fontSize: { sm: 24, xs: 15 } }}
                  textAlign="center"
                >
                  {tab === "about" ? "about us" : tab}
                </Typography>
              </MenuItem>
            </NavLink>
          );
        })}
      </NavbarMenu>
    </Box>
  );
};

export default DropdownMenu;
