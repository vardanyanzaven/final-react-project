import React, { useEffect } from "react";

const AboutPage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("about");
    return () => setActiveLinkId(null);
  }, []);
  return <div>AboutPage</div>;
};

export default AboutPage;
