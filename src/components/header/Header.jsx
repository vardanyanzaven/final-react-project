import React from "react";
import { NavLink } from "react-router-dom";
import { Typography, Button, Box, ThemeProvider, Avatar } from "@mui/material";
import { AppBar, Container, Toolbar } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HeaderTheme from "../../themes/HeaderTheme";
import { HEADER_TAB_LIST } from "../../constants/common";
import DropdownMenu from "./DropdownMenu";
import AvatarMenu from "./AvatarMenu";
import { useAuth } from "../../hooks/useAuth";
import AuthDraw from "../dialog/AuthDraw";

const Header = ({ activeLinkId, setActiveLinkId }) => {
  const checkIfActive = (id) => activeLinkId === id;
  const { isAuth } = useAuth();
  const activateEl = (e) => setActiveLinkId(e.currentTarget.id);

  return (
    <ThemeProvider theme={HeaderTheme}>
      <AppBar position="fixed" sx={{ backgroundColor: "#192026" }}>
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
                    fontSize: { xs: 30, sm: 40 },
                  }}>
                  <Avatar
                    src="favicon.ico"
                    sx={{ width: "60px", height: "60px" }}
                  />
                  LUXE DRIVE
                </Typography>
              </NavLink>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "space-evenly",
                flexGrow: 1,
              }}>
              {Object.keys(HEADER_TAB_LIST).map((tab) => (
                <NavLink to={`/${tab}`} className="navbar-link" key={tab}>
                  <Button
                    variant="navbar"
                    id={tab}
                    onClick={activateEl}
                    className={`${
                      checkIfActive(tab) ? "active-navbar-btn" : ""
                    }`}>
                    <Typography variant="h5" noWrap>
                      {HEADER_TAB_LIST[tab]}
                    </Typography>
                  </Button>
                </NavLink>
              ))}
            </Box>
            {isAuth ? <AvatarMenu /> : <AuthDraw />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
