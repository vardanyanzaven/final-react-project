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
      if (marker) {
        marker.remove();
      }
      const newMarker = L.marker([lat, lng], { icon }).addTo(map);
      setmarker(newMarker);
      setcordinates([lat, lng]);
      getAddressFromCoordinates(lat, lng)
        .then((address) => {
          console.log(`The address is: ${address}`);
        })
        .catch(({ message }) => {
          console.error(message);
        });
    },
  });
  return null;
}
const getAddressFromCoordinates = (lat, lng) => {
  return new Promise((resolve, reject) => {
    window.onload = function () {
      // Create a new geocoder instance
      const geocoder = new window.google.maps.Geocoder();
      if (geocoder === undefined) {
        console.log(111);
      }

      // Create a LatLng object from the given latitude and longitude values
      const latLng = new window.google.maps.LatLng(lat, lng);

      // Use the geocoder to perform reverse geocoding
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK") {
          // If the geocoding was successful, return the first result's formatted address
          if (results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject("No results found");
          }
        } else {
          reject(`Geocoder failed due to: ${status}`);
        }
      });
    };
  });
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
