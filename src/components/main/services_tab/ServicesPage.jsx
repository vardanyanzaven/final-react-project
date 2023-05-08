import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, ImageList, ImageListItem, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";
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
      }}>
      <Typography
        className="heading"
        variant="h3"
        sx={{ mt: 1, outline: "1px solid #F2B918" }}
        color="#F2B918">
        Our services
      </Typography>
      <ImageList cols={3}>
        <div className="containerr">
          <Swiper
            slidesPerView="auto"
            effect={"coverflow"}
            grabCursor={true}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container">
            {SERVICE_DATA().map((ser) => (
              <SwiperSlide key={Math.random()}>
                <Link to={ser.name}>
                  <ImageListItem>
                    <Typography variant="h4">
                      {ser.name.toUpperCase()}
                    </Typography>
                    <img src={ser.url} alt={ser.name} />
                  </ImageListItem>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </ImageList>
    </Box>
    // </ThemeProvider>
  );
};

export default ServicesPage;
