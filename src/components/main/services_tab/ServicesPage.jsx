import {
  Box,
  ImageList,
  ImageListItem,
  ListSubheader,
  Typography,
} from "@mui/material";
import { SERVICE_DATA } from "./booking_form/servicesData";
import { useEffect } from "react";
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
      }}
    >
      <Typography> Our services </Typography>
      <ImageList cols={3}>
        {SERVICE_DATA.map((ser) => (
          <ImageListItem sx={{ gap: "10px" }}>
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
        ))}
      </ImageList>
    </Box>
  );
};

export default ServicesPage;

{
  
  //   "&:hover": {
  //     transform: "translateY(-40px)",
  //   },
  // }));
}
