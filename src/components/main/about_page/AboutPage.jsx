import React, { useEffect } from "react";
import { aboutStyles } from "./styles";
import "./AboutUs.css";

import WhoWeAre from "../home/WhoWeAre";
import ContactUs from "../home/ContactUs";
import OurGallery from "./OurGallery";
import OurAdvantages from "./OurAdvantages";
import { Comments } from "./Comments";

import "./AboutUs.css";

const AboutPage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("about");
    return () => setActiveLinkId(null);
  }, []);

  return (
    <div className="aboutus_container">
      <WhoWeAre />
      <OurAdvantages />
      <OurGallery />
      <Comments />
    </div>
  );
};

export default AboutPage;
