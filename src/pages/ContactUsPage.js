import React, { useEffect } from "react";

const ContactUsPage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("contact-us");
  }, []);
  return <div>ContactUsPage</div>;
};

export default ContactUsPage;
