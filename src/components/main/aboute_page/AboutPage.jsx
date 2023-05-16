import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import bgImg from "../../../assets/about/smiling-african-american-taxi-service-driver-expecting-client-near-luxury-car-2AMP6DG.jpg";

const AboutPage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("about");
    return () => setActiveLinkId(null);
  }, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
          "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        opacity: "0.6",
        overflow: "hidden",
        height: "760px",
      }}>
      <Typography
        variant="h4"
        sx={{
          color: "#787802",
          fontFamily: "monospace",
          width: "65%",
          wordSpacing: "3px",
          lineHeight: "30px",
          userSelect: "none",
          textShadow:
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          m: "20px",
        }}>
        Welcome to our website, created with the combined efforts of our
        dedicated team. Our goal is to provide you with a seamless and enjoyable
        browsing experience, as well as to share valuable information and
        insights with you. Whether you are here to learn more about our products
        and services, or simply looking to gain knowledge on a particular topic,
        we have you covered. Our website is designed to be user-friendly, with
        easy navigation and intuitive features that allow you to quickly find
        what you are looking for. One of the key aspects of our website is the
        emphasis we place on providing accurate and up-to-date information. Our
        team is constantly researching and staying informed on the latest
        industry developments, trends, and best practices to ensure that we
        provide you with the most reliable information possible. In addition to
        informative content, we also strive to foster a sense of community on
        our website. We encourage you to leave comments, share your thoughts,
        and engage with other visitors to our site.
      </Typography>
    </div>
  );
};

export default AboutPage;
