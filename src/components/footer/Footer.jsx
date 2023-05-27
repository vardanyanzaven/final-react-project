import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CopyrightIcon from "@mui/icons-material/Copyright";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneIcon from "@mui/icons-material/Phone";
import { ContainerBox, FooterTheme } from "../../themes/FooterTheme";

const Footer = () => {
  const onHandleClick = (value) => {
    if (value === "instagram") {
      window.open("https://www.instagram.com/", "_blank");
    }
    if (value === "facebook") {
      window.open("https://www.facebook.com/", "_blank");
    }
    if (value === "whatsUp") {
      window.open("https://api.whatsapp.com/", "_blank");
    }
  };

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
          <IconButton onClick={() => onHandleClick("instagram")}>
            <InstagramIcon />
          </IconButton>
          <IconButton onClick={() => onHandleClick("facebook")}>
            <FacebookIcon />
          </IconButton>
          <IconButton onClick={() => onHandleClick("whatsUp")}>
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
