import { Link } from "react-router-dom";
import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { SERVICE_DATA } from "../../../constants/common";
import { servicePageStyle } from "./styles";

const ServicesPage = () => {
  return (
    // <ThemeProvider theme={ServiceTheme}>
    <Box sx={servicePageStyle.mainBox}>
      <ImageList cols={3} gap={20} sx={{ ml: 8, mr: 8 }}>
        {SERVICE_DATA().map((ser) => (
          <Link to={ser.name} key={Math.random()}>
            <ImageListItem>
              <Typography variant="h4" color="#020222" padding="10%">
                {ser.name.toUpperCase()}
              </Typography>
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
