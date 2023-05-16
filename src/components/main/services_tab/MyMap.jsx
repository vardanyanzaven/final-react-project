import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import React from "react";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

function MyComponent({ setcordinates }) {
  const [marker, setmarker] = useState();
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      console.log(e);
      if (marker) {
        marker.remove();
      }
      const newMarker = L.marker([lat, lng], { icon }).addTo(map);
      setmarker(newMarker);
      setcordinates([lat, lng]);
      getAddressFromCoordinates(lat, lng)
        .then((address) => {
          console.log(` Address is ${address}`);
        })
        .catch(({ message }) => {
          console.error(message);
        });
    },
  });
  return null;
}
const getAddressFromCoordinates = async (lat, lng) => {
  const data = await fetch(
    `http://api.positionstack.com/v1/reverse?access_key=b8ed63f1fcdf51a8dbec592013c34f6b&query=${lat},${lng}`
  );

  const res = await data.json();
  console.log(res);
};

export default function MyMap({ setcordinates }) {
  const [markers, setmarkers] = useState(true);

  return (
    <div>
      <MapContainer
        className="Map"
        center={{ lat: 40.7, lng: -74 }}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyComponent setcordinates={setcordinates} />
      </MapContainer>
    </div>
  );
}
