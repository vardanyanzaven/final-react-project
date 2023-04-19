import React, { useEffect } from "react";

const ContactUsPage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("contact");
  }, []);
  return <div>ContactUsPage</div>;
};

export default ContactUsPage;
