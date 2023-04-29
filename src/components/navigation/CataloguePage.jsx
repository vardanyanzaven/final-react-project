import React, { useEffect } from "react";

const CataloguePage = ({ setActiveLinkId }) => {
  useEffect(() => {
    setActiveLinkId("catalogue");
    return () => setActiveLinkId(null);
  }, []);

  return <div>CataloguePage</div>;
};

export default CataloguePage;
