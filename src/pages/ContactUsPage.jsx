import React, { useEffect } from "react";

const ContactUsPage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("contact");
    return () => setActiveLinkId(null);
  }, []);
  return <div>ContactUsPage</div>;
};

export default ContactUsPage;
