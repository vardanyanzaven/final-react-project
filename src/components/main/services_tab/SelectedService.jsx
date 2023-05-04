import * as React from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import { SERVICE_DATA } from "./booking_form/servicesData";

export default function SelectedService() {
  const navigate = useNavigate();
  const { serve } = useParams();
  const [info] = SERVICE_DATA(serve);

  return (
    <div style={{ margin: "100px" }}>
      <img src={info.url} width={600} />
      <p style={{ width: "600px" }}>{info.title}</p>
      <button>Book now</button>
      <button onClick={() => navigate(-1)}>back</button>
    </div>
  );
}
