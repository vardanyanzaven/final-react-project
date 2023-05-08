import React, { useEffect, useState } from "react";
// import ResponsiveGrid from "../services_tab/GridTabServices";
// import { Booking } from "../services_tab/Booking";

const ServicesPage = ({ setActiveLinkId }) => {
  // const [service, setService] = useState(true);
  useEffect(() => {
    setActiveLinkId("services");
    return () => setActiveLinkId(null);
  }, []);

  // const onClose = () => {
  //   setService(!service);
  // };

  // return service ? (
  //   <ResponsiveGrid service={service} setService={setService} />
  // ) : (
  //   <Booking service={service} onClose={onClose} />
  // );
  return (
    <div>ServicePage</div>
  )
};

export default ServicesPage;
