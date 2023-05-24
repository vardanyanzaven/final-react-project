import React, { useState } from "react";
import "./HomePageSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGES_FOR_HOME_PAGE_SLIDER } from "../../constants/common";
import { NavLink } from "react-router-dom";
import { settings, sliderStyles } from "./styles";

const HomePageSlider = () => {
  return (
    <div className="homepage-slider">
      <Slider {...settings}>
        {IMAGES_FOR_HOME_PAGE_SLIDER.map((slide) => (
          <div key={slide.id} className="slide-item">
            <div
              className="slide-background"
              style={{
                ...sliderStyles,
                backgroundImage: `url(${slide.imgUrl})`,
              }}>
              <div className="content">
                <h2 className="title" style={sliderStyles.title}>
                  {slide.title}
                </h2>
                <p className="subtitle" style={sliderStyles.subTitle}>
                  {slide.subtitle}
                </p>
                <NavLink to="services" className="slide-button">
                  Get Started!
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomePageSlider;
