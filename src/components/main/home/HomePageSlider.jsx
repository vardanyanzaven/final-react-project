import React, { useState } from "react";
import "./HomePageSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGES_FOR_HOME_PAGE_SLIDER } from "../../../constants/common";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  fade: true,
};

const HomePageSlider = () => {
  return (
    <div className="homepage-slider">
      <Slider {...settings}>
        {IMAGES_FOR_HOME_PAGE_SLIDER.map((slide) => (
          <div key={slide.id} className="slide-item">
            <div
              className="slide-background"
              style={{
                backgroundImage: `url(${slide.imgUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "100%",
                height: "500px",
              }}
            >
              <div className="content">
                <h2
                  className="title"
                  style={{
                    fontSize: 80,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {slide.title}
                </h2>
                <p
                  className="subtitle"
                  style={{ fontSize: 50, color: "white", textAlign: "center" }}
                >
                  {slide.subtitle}
                </p>
                <Button variant="contained">
                  <Link to={"/services"}>Get Started </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomePageSlider;
