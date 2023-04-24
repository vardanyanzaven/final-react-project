import React, { useEffect } from "react";

const ServicesPage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("services");
    return () => setActiveLinkId(null);
  }, []);
  return <div>ServicesPage</div>;
};

export default ServicesPage;
