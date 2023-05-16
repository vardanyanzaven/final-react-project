import React from "react";
import HomePageSlider from "./HomePageSlider";
import { Comments } from "./Comments";

export const HomePage = () => {
  return (
    <div className="homepage-slider">
      <HomePageSlider />
      <Comments />
    </div>
  );
};
