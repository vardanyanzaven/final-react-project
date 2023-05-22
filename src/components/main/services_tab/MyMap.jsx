import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import React from "react";
import axios from "axios";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import create from "zustand";
import "./style.css";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

function MyComponent({ setcordinates, setPlace }) {
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
      getAddressFromCoordinates(lat, lng, setPlace);
    },
  });
  return null;
}

let props = {
  apiKey: "efd16f450d0740278e0a0189acf69abd",
  countryCodes: [],
  notify: () => console.log("callllinnnggg"),
};

const getAddressFromCoordinates = async (lat, lng, setPlace) => {
  axios
    .get("http://api.positionstack.com/v1/reverse", {
      params: {
        access_key: "3523128e632d2f33244b2a65a0b3d0e8",
        query: `${lat},${lng}`,
      },
    })
    .then((response) => {
      console.log(response.data, "my console");
      setPlace(response.data.data[0].name);
    })
    .catch((error) => {
      console.error("IMMM" + error);
    });
};

const emptyAddress = {
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  postcode: "",
  country: "",
};

const useAddressStore = create((set) => ({
  address: emptyAddress,
  set: (address) => set({ address: address }),
  clear: () => set({ address: emptyAddress }),
}));

export default function MyMap({ setcordinates }) {
  const [place, setPlace] = useState("");
  const { address, set, clear } = useAddressStore();
  const onPlaceSelect = (value) => {
    let _props = value?.properties;
    if (_props)
      set({
        address_line1: _props.address_line1,
        address_line2: _props.address_line2,
        city: _props.city,
        state: _props.state,
        postcode: _props.postcode,
        country: _props.country,
      });
    else clear();
    props.notify();
    return value;
  };
  const onSuggestionsChange = (value) => value;
  const filterSuggestions = (value) => value;
  const preProcess = (value) => value;
  const postProcess = (feature) => {
    let props = feature.properties;
    let latlng = feature.bbox.slice(0, 2);
    return `${props.address_line1}, ${props.address_line2}`;
  };

  return (
    <>
      <GeoapifyContext apiKey={props.apiKey}>
        <GeoapifyGeocoderAutocomplete
          placeholder="Search address here"
          countryCodes={props.countryCodes}
          placeSelect={onPlaceSelect}
          suggestionsChange={onSuggestionsChange}
          preprocessHook={preProcess}
          postprocessHook={postProcess}
          suggestionsFilter={filterSuggestions}
          value={
            address && address.address_line1 && address.address_line2
              ? `${address.address_line1}, ${address.address_line2}`
              : place
          }
        />
      </GeoapifyContext>
      <div>
        <MapContainer
          className="Map"
          center={{ lat: 40.180094, lng: 44.515229 }}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "500px" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyComponent setcordinates={setcordinates} setPlace={setPlace} />
        </MapContainer>
      </div>
    </>
  );
}
