import {
  Box,
  ImageList,
  ImageListItem,
  ListSubheader,
  Typography,
} from "@mui/material";
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
  /* <Box sx={{ flexGrow: 1, mt: 10, ml: 20, mr: 20 }}>
        {Array(Math.ceil(servicesData.length / 3))
          .fill()
          .map((_, i) => (
            <Grid container spacing={8} key={i}>
              {servicesData.slice(i * 3, i * 3 + 3).map((sv) => (
                <Grid item xs={12} sm={6} md={4} key={sv.name}>
                  <Link to={sv.name}>
                    <Item
                      src={sv.url}
                      sx={{
                        // flexGrow: 1,
                        mt: 8,
                        ml: 2,
                        mr: 2,
                      }}
                    >
                      <SelectedService sv={sv} />
                    </Item>
                  </Link>
                </Grid>
              ))}
            </Grid>
          ))}
      </Box> */
  // const onClose = () => {
  //   setService(!service);
  // };
  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(12),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  //   transition: "transform 0.3s ease-in-out",
  //   "&:hover": {
  //     transform: "translateY(-40px)",
  //   },
  // }));
}
