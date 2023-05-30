import { servicePageStyle } from "./styles";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import { Box, ImageList, ImageListItem } from "@mui/material";
import { ThemeProvider, Typography } from "@mui/material";
import { SERVICE_DATA } from "../../../constants/common";
import ServiceTheme from "../../../themes/serviceTheme";

export const ServicesPage = () => {
  return (
    <ThemeProvider theme={ServiceTheme}>
      <Box sx={servicePageStyle.mainBox}>
        <Typography sx={{ mt: 6 }} variant="h2" color="#F2B918">
          Our services
        </Typography>
        <ImageList cols={3} gap={25} sx={{ ml: 8, mr: 8 }}>
          {SERVICE_DATA().map((ser) => (
            <Link to={ser.name} key={v4()}>
              <ImageListItem
                sx={{
                  mt: "30px",
                }}>
                <Typography sx={{ fontSize: "33px" }}>
                  {ser.name.toUpperCase()}
                </Typography>
                <img
                  src={ser.url}
                  alt={ser.name}
                  style={{
                    borderRadius: "10px",
                    marginTop: "30px",
                    width: 400,
                    border: "3px solid",
                    fontWeight: "bold",
                  }}
                />
              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      </Box>
    </ThemeProvider>
  );
};
