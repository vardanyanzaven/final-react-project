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
import { HEADER_TAB_LIST } from "../../constants/common";
import DropdownMenu from "./DropdownMenu";
import Auth from "../Auth";

const Header = ({ activeLinkId, setActiveLinkId }) => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false);

  const handleOpenLogin = () => {
    setLoginDialogOpen(true);
    setSignUpDialogOpen(false);
  };

  const handleOpenSignUp = () => {
    setSignUpDialogOpen(true);
    setLoginDialogOpen(false);
  };

  const onClose = () => {
    setSignUpDialogOpen(false);
    setLoginDialogOpen(false);
  };

  const checkIfActive = (id) => activeLinkId === id;

  const activateEl = (e) => setActiveLinkId(e.currentTarget.id);

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
            }}>
            <DropdownMenu />

            <Box sx={{ pb: { xs: 0, sm: 1 }, flexGrow: { xs: 1, md: 0 } }}>
              <NavLink
                to="/"
                className="navbar-link"
                id="home"
                onClick={activateEl}>
                <Typography
                  noWrap
                  className="logo-text"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: { xs: 28, sm: 40 },
                  }}>
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
              {Object.keys(HEADER_TAB_LIST).map((tab) => 
              (
                  <NavLink
                    to={`/${tab}`}
                    className="navbar-link"
                    key={tab}
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
                        {HEADER_TAB_LIST[tab]}
                      </Typography>
                    </Button>
                  </NavLink>
                )
              )}
            </Box>
            <Auth
              handleOpenLogin={handleOpenLogin}
              handleOpenSignUp={handleOpenSignUp}
              loginDialogOpen={loginDialogOpen}
              signUpDialogOpen={signUpDialogOpen}
              onClose={onClose}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
