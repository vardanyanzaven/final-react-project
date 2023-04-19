import React, { useEffect } from "react";

const ServicesPage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("services");
  }, []);
  return <div>ServicesPage</div>;
};

export default ServicesPage;
