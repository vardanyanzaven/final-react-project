import React, { useState } from "react";
import "./HomePageSlider.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HomePageSlider = () => {
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: "Rent a Car Today!",
      subtitle: "Affordable and Flexible Rental Options",
      imgUrl: "images/sliderImg1.jpg",
    },
    
    {
      id: 2,
      title: "Explore Your Next Adventure",
      subtitle: "Choose from a Wide Range of Car Models",
      imgUrl: "images/sliderImg2.jpg",
    },
    {
      id: 3,
      title: "Drive in Style",
      subtitle: "Luxury Cars for Special Occasions",
      imgUrl: "images/sliderImg3.jpg",
    },
  ]);

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

  return (
    <div className="homepage-slider">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide-item" >
            <div className = "slide-background" style={{ backgroundImage: `url(${slide.imgUrl})`, backgroundRepeat:"no-repeat", backgroundSize: 'cover',  width:'100%', height: "500px"} }>
            <div className="content">
              <h2 className="title" style={{fontSize: 100, color: 'white', textAlign: 'center'}}>{slide.title}</h2>
              <p className="subtitle" style={{fontSize: 50, color: 'white', textAlign: 'center'}}>{slide.subtitle}</p>
             <button className = "slide-button">Get Started!</button> 
            </div>
          </div>
          </div>
          
        ))}
      </Slider>
    </div>
  );
};

export default HomePageSlider;
