import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const Banner = () => {
  const data = [
    "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
  ];

  // Custom Prev Arrow
  const PrevArrow = ({ onClick }) => (
    <IconButton
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        backgroundColor: "white",
        color: "black",
        zIndex: 1,
        opacity: "40%",
      }}
    >
      <ArrowBackIos />
    </IconButton>
  );

  // Custom Next Arrow
  const NextArrow = ({ onClick }) => (
    <IconButton
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        backgroundColor: "white",
        color: "black",
        zIndex: 1,
        opacity: "40%",
      }}
    >
      <ArrowForwardIos />
    </IconButton>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div style={{ position: "relative" }}>
      <Slider {...settings}>
        {data.map((img, i) => (
          <div key={i}>
            <img
              src={img}
              alt={`img-${i}`}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
