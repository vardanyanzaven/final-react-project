import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Box,
  ThemeProvider,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HeaderTheme from "../../themes/HeaderTheme";
import AuthOptions from "../authentication/AuthOptions";
import { HEADER_TAB_LIST } from "../../constants/common";
import DropdownMenu from "./DropdownMenu";

const Header = ({ activeLinkId, setActiveLinkId }) => {
  const checkIfActive = (id) => {
    return activeLinkId === id;
  };
  const activateEl = (e) => {
    setActiveLinkId(e.currentTarget.id);
  };

  return (
    <ThemeProvider theme={HeaderTheme}>
      <AppBar position="static" sx={{ backgroundColor: "#192026" }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              alignItems: "center",
              height: 80,
            }}
          >
            <DropdownMenu />

            <Box sx={{ pb: { xs: 0, sm: 1 }, flexGrow: { xs: 1, md: 0 } }}>
              <NavLink
                to="/"
                className="navbar-link"
                id="home"
                onClick={activateEl}
              >
                <Typography
                  noWrap
                  className="logo-text"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: { xs: 28, sm: 40 },
                  }}
                >
                  <DirectionsCarIcon />
                  Logo
                </Typography>
              </NavLink>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "space-evenly",
                flexGrow: 1,
              }}
            >
              {HEADER_TAB_LIST.map((tab) => {
                if (tab === "contact us") {
                  return (
                    <Button variant="navbar" id={tab} key={tab}>
                      <Typography variant="h5" noWrap>
                        {tab}
                      </Typography>
                    </Button>
                  );
                }
                return (
                  <NavLink
                    to={`/${tab.split(" ").join("-")}`}
                    className="navbar-link"
                    key={tab.split(" ").join("-")}
                  >
                    <Button
                      variant="navbar"
                      id={tab}
                      onClick={activateEl}
                      className={`${
                        checkIfActive(tab) ? "active-navbar-btn" : ""
                      }`}
                    >
                      <Typography variant="h5" noWrap>
                        {tab === "about" ? "about us" : tab}
                      </Typography>
                    </Button>
                  </NavLink>
                );
              })}
            </Box>

            <AuthOptions />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
