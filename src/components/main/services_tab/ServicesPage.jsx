import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, ImageList, ImageListItem, ThemeProvider, Typography } from "@mui/material";
import { SERVICE_DATA } from "../../../constants/common";
import ServiceTheme from "../../../themes/ServiceTheme";
import { servicePageStyle } from "./styles";
import {v4} from "uuid";

const ServicesPage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("services");
    return () => setActiveLinkId(null);
  }, []);

  return (
    <ThemeProvider theme={ServiceTheme}>
      <Box sx={servicePageStyle.mainBox}>
        <Typography className="heading" variant="h2" color="#F2B918">
          Our services
        </Typography>
        <ImageList cols={3} gap={25} sx={{ ml: 8, mr: 8 }}>
          {SERVICE_DATA().map((ser) => (
            <Link to={ser.name} key={v4()}>
              <ImageListItem sx={{mt: "30px"}}>
                <Typography variant="h4">{ser.name.toUpperCase()}</Typography>
                <img
                  src={ser.url}
                  alt={ser.name}
                  className="image"
                  style={{ borderRadius: "10px", marginTop: "30px" }}
                />
              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      </Box>
    </ThemeProvider>
  );
};

export default ServicesPage;
