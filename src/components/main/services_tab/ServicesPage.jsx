import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { SERVICE_DATA } from "./booking_form/servicesData";
// import ResponsiveGrid from "../services_tab/GridTabServices";
// import { Booking } from "../services_tab/Booking";

const ServicesPage = ({ setActiveLinkId }) => {
  const [notBooked, setnotBooked] = useState(true);

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
      }}
    >
      <Typography sx={{ mt: 10 }} variant="h5">
        Our services
      </Typography>
      <ImageList cols={3} gap={40} sx={{ p: "7rem" }}>
        {SERVICE_DATA().map((ser) => (
          <Link to={ser.name} key={Math.random()}>
            <ImageListItem
              sx={{
                "&:hover": {
                  transform: "translateY(-20px)",
                },
              }}
            >
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
