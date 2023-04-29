import React, { useEffect } from "react";
import { Booking } from "./servicesTabContent/Booking";
import { CarsCatalogue } from "./servicesTabContent/CarsCatalogue";
import { useState } from "react";

const ServicesPage = ({ setActiveLinkId }) => {
  const [cars, setCars] = useState(true);
  useEffect(() => {
    setActiveLinkId("services");
    return () => setActiveLinkId(null);
  }, []);
  return cars ? <CarsCatalogue cars={cars} setCars={setCars} /> : <Booking />;
};

export default ServicesPage;
