import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CopyrightIcon from "@mui/icons-material/Copyright";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneIcon from "@mui/icons-material/Phone";
import { ContainerBox, FooterTheme } from "../themes/FooterTheme";

const Footer = () => {
  return (
    <ThemeProvider theme={FooterTheme}>
      <ContainerBox>
        <Typography
          sx={{ display: "flex", alignItems: "center", color: "white" }}
        >
          <CopyrightIcon sx={{ mr: 1 }} />
          Company name.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton>
            <InstagramIcon />
          </IconButton>
          <IconButton>
            <FacebookIcon />
          </IconButton>
          <IconButton>
            <WhatsAppIcon />
          </IconButton>
          <IconButton>
            <PhoneIcon />
          </IconButton>
        </Box>
      </ContainerBox>
    </ThemeProvider>
  );
};

export default Footer;
