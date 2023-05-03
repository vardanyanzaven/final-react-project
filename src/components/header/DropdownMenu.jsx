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
    padding: 0,
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
        color="inherit">
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
        }}>
        {Object.keys(HEADER_TAB_LIST).map((tab) => (
          <NavLink key={tab} to={tab} className="navbar-link">
            <MenuItem
              onClick={closeNavMenu}
              sx={{
                borderBottom: tab === "about" ? "none" : "2px solid #F2B90D",
                transition: "background 0.1s",
                "&:hover": {
                  background: "rgb(37, 47, 57)",
                },
              }}>
              <Typography
                sx={{ fontSize: { sm: 22, xs: 17 } }}
                textAlign="center">
                {HEADER_TAB_LIST[tab]}
              </Typography>
            </MenuItem>
          </NavLink>
        ))}
        <MenuItem
          sx={{
            display: { xs: "flex", sm: "none" },
            borderTop: "2px solid #F2B90D",
            transition: "background 0.15s",
            "&:hover": {
              background: "rgba(215, 182, 93, 0.3)",
              color: "#F2B90D",
            },
          }}>
          <Typography
            sx={{
              fontSize: { sm: 24, xs: 19 },
            }}
            variant="h5"
            noWrap>
            Sign Up
          </Typography>
        </MenuItem>
      </NavbarMenu>
    </Box>
  );
};

export default DropdownMenu;
