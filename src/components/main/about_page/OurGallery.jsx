import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./OurGallery.css";
import galleryimg1 from "../../../assets/about/galleryimg1.jpg";
import galleryimg2 from "../../../assets/about/galleryimg2.jpg";
import galleryimg3 from "../../../assets/about/galleryimg3.jpg";


export default function OurGallery() {
  return (
    <div className="ourgallery_container">
      <h1 className="ourgallery_title">OurGallery</h1>
      <ImageList
        sx={{ width: "auto", height: "auto" }}
        cols={3}
        rowHeight={"auto"}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={item.img}
              srcSet={item.img}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Button className="ourgallery_btn" variant="contained">
        <Link to={"/services"}>Book Now! </Link>
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
    img: galleryimg3,
    title: "galleryimg4",
  },
  {
    img: galleryimg2,
    title: "galleryimg5",
  },
  {
    img: galleryimg1,
    title: "galleryimg6",
  },
  {
    img: galleryimg1,
    title: "galleryimg7",
  },
  {
    img: galleryimg2,
    title: "galleryimg8",
  },
  {
    img: galleryimg3,
    title: "galleryimg9",
  },
];
