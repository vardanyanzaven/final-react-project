import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
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
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h3"
        sx={{ mt: 1, outline: "1px solid #F2B918" }}
        color="#F2B918"
      >
        Our services
      </Typography>
      <ImageList cols={3}>
        {SERVICE_DATA().map((ser) => (
          <Link to={ser.name} key={Math.random()}>
            <ImageListItem
              sx={{
                "&:hover": {
                  transform: "scale(1.1)",
                },
                m: 2,
              }}
            >
              <img
                src={ser.url}
                alt={ser.name}
                style={{
                  height: "200px",
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
