import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { SERVICE_DATA } from "../../../constants/common";

const ServicesPage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("services");
    return () => setActiveLinkId(null);
  }, []);

  return (
    // <ThemeProvider theme={ServiceTheme}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        flexDirection: "column",
        "& .image:hover": {
          transform: "translateY(-40px)",
        },
      }}>
      <Typography className="heading" variant="h3" color="#F2B918">
        Our services
      </Typography>
      <ImageList cols={3} gap={20} sx={{ ml: 8, mr: 8 }}>
        {SERVICE_DATA().map((ser) => (
          <Link to={ser.name} key={Math.random()}>
            <ImageListItem>
              <Typography variant="h4">{ser.name.toUpperCase()}</Typography>
              <img
                src={ser.url}
                alt={ser.name}
                className="image"
                sx={{ borderRadius: "50%" }}
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    </Box>

    // </ThemeProvider>
  );
};

export default ServicesPage;
