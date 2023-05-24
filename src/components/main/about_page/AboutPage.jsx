import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import bgImg from "../../../assets/about/smiling-african-american-taxi-service-driver-expecting-client-near-luxury-car-2AMP6DG.jpg";
import { Comments } from "./Comments";
import { aboutStyles } from "./styles";

const AboutPage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("about");
    return () => setActiveLinkId(null);
  }, []);

  return (
    <>
      <div
        style={{ ...aboutStyles.aboutMain, backgroundImage: `url(${bgImg})` }}>
        <Typography variant="h4" sx={aboutStyles.body}>
          Welcome to our website, created with the combined efforts of our
          dedicated team. Our goal is to provide you with a seamless and
          enjoyable browsing experience, as well as to share valuable
          information and insights with you. Whether you are here to learn more
          about our products and services, or simply looking to gain knowledge
          on a particular topic, we have you covered. Our website is designed to
          be user-friendly, with easy navigation and intuitive features that
          allow you to quickly find what you are looking for. One of the key
          aspects of our website is the emphasis we place on providing accurate
          and up-to-date information. Our team is constantly researching and
          staying informed on the latest industry developments, trends, and best
          practices to ensure that we provide you with the most reliable
          information possible. In addition to informative content, we also
          strive to foster a sense of community on our website. We encourage you
          to leave comments, share your thoughts, and engage with other visitors
          to our site.
        </Typography>
      </div>
      <Comments />
    </>
  );
};

export default AboutPage;
