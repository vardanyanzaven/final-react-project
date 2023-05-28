import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./OurGallery.css";
import galleryimg1 from "../../../assets/about/galleryimg1.jpg";
import galleryimg2 from "../../../assets/about/galleryimg2.jpg";
import galleryimg3 from "../../../assets/about/galleryimg3.jpg";
import galleryimg4 from "../../../assets/about/galleryimg4.jpg";
import galleryimg5 from "../../../assets/about/galleryimg5.jpg";
import galleryimg6 from "../../../assets/about/galleryimg6.jpg";
import galleryimg7 from "../../../assets/about/galleryimg7.jpg";
import galleryimg8 from "../../../assets/about/galleryimg8.jpg";
import galleryimg9 from "../../../assets/about/galleryimg9.jpg";
import { Comments } from "./Comments";
import { v4 } from "uuid";


export default function OurGallery() {
  return (
    <div className="ourgallery_container">
      <h1 className="ourgallery_title">OurGallery</h1>
      <ImageList
        sx={{ width: "auto", height: "auto" }}
        cols={3}
        rowHeight={"auto"}>
        {itemData.map((item) => (
          <ImageListItem key={v4()}>
            <img
              src={item.img}
              srcSet={item.img}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Button className="ourgallery_btn" variant="outlined">
        <Link to={"/catalogue"}>Make a Reservation! </Link>
      </Button>
      
    </div>
  );
}

const itemData = [
  {
    img: galleryimg1,
    title: "galleryimg1",
  },
  {
    img: galleryimg2,
    title: "galleryimg2",
  },
  {
    img: galleryimg3,
    title: "galleryimg3",
  },
  {
    img: galleryimg4,
    title: "galleryimg4",
  },
  {
    img: galleryimg5,
    title: "galleryimg5",
  },
  {
    img: galleryimg6,
    title: "galleryimg6",
  },
  {
    img: galleryimg7,
    title: "galleryimg7",
  },
  {
    img: galleryimg8,
    title: "galleryimg8",
  },
  {
    img: galleryimg9,
    title: "galleryimg9",
  },
];
