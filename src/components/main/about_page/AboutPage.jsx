
import React, { useEffect } from "react";
import WhoWeAre from "../home/WhoWeAre";
import ContactUs from "../home/ContacUs";
import OurGallery from "./OurGallery" ; 
import OurAdvantages from "./OurAdvantages" ; 
import "./AboutUs.css";


const AboutPage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("about");
    return () => setActiveLinkId(null);
  }, []);

  return (
    <div>
     <WhoWeAre/>
     <OurAdvantages/>
     <OurGallery/>
     <ContactUs/> 
     
    </div>
  );
};

export default AboutPage;
