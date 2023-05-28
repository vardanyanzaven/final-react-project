import React from "react";
import { NavLink } from "react-router-dom";
import { Typography, Button, Box, ThemeProvider, Avatar } from "@mui/material";
import { AppBar, Container, Toolbar } from "@mui/material";
import HeaderTheme from "../../themes/HeaderTheme";
import { HEADER_TAB_LIST } from "../../constants/common";
import DropdownMenu from "./DropdownMenu";
import AvatarMenu from "./AvatarMenu";
import { useAuth } from "../../hooks/useAuth";
import AuthDraw from "../dialog/AuthDraw";
import { SwitchButton } from "../main/home/SwitchButton";
import { headStyles } from "./styles";

const Header = ({ activeLinkId, setActiveLinkId }) => {
  const checkIfActive = (id) => activeLinkId === id;
  const { isAuth } = useAuth();
  const activateEl = (e) => setActiveLinkId(e.currentTarget.id);

  return (
    <ThemeProvider theme={HeaderTheme}>
      <AppBar position="fixed" sx={{ backgroundColor: "#192026" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={headStyles.toolBarStyle}>
            <DropdownMenu />

            <Box sx={headStyles.mainBox}>
              <NavLink
                to="/"
                className="navbar-link"
                id="home"
                onClick={activateEl}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}>
                  <Box
                    component="img"
                    src="favicon.ico"
                    sx={headStyles.favIcon}
                  />
                  <Typography sx={headStyles.title1}>LUXE</Typography>
                  <Typography sx={headStyles.title2}>DRIVE</Typography>
                </Box>
              </NavLink>
            </Box>
            <Box sx={headStyles.tabs}>
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
            <SwitchButton />
            {isAuth ? <AvatarMenu /> : <AuthDraw />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
