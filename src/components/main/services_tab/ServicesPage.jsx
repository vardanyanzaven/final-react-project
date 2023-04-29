import {
  Box,
  ImageList,
  ImageListItem,
  ListSubheader,
  Typography,
} from "@mui/material";
import { SERVICE_DATA } from "./booking_form/servicesData";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import ResponsiveGrid from "../services_tab/GridTabServices";
// import { Booking } from "../services_tab/Booking";

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
