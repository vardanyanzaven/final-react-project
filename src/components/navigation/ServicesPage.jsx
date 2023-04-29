import React, { useEffect } from "react";
import { useState } from "react";
import ResponsiveGrid from "../servicesTabContent/GridTabServices";
import { Booking } from "../servicesTabContent/Booking";

const ServicesPage = ({ setActiveLinkId }) => {
  const [service, setService] = useState(true);
  useEffect(() => {
    setActiveLinkId("services");
    return () => setActiveLinkId(null);
  }, []);

  const onClose = () => {
    setService(!service);
  };

  return service ? (
    <ResponsiveGrid service={service} setService={setService} />
  ) : (
    <Booking service={service} onClose={onClose} />
  );
};

export default ServicesPage;
