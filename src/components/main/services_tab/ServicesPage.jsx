import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { SERVICE_DATA } from "./booking_form/servicesData";

const ServicesPage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("services");
    return () => setActiveLinkId(null);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "column",
      }}>
      <Typography> Our services </Typography>
      <ImageList rowHeight={300} cols={3} gap={30} sx={{ p: "3rem" }}>
        {SERVICE_DATA().map((ser) => (
          <Link to={ser.name} key={Math.random()}>
            <ImageListItem
              sx={{
                "&:hover": {
                  transform: "translateY(-20px)",
                },
              }}>
              <img
                src={ser.url}
                alt={ser.name}
                style={{
                  "&:hover": {
                    transform: "translateY(-40px)",
                  },
                }}
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    </Box>
  );
};

export default ServicesPage;
