import * as React from "react";
import { useParams } from "react-router";

export default function SelectedService({ sv }) {
  const { serve } = useParams();
  return (
    <>
      <div>this is {serve} page </div>
    </>
  );
}
