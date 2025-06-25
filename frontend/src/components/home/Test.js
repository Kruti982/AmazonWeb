import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

const TestCarousel = () => {
  const items = [
    "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
    "https://images.vexels.com/content/194698/preview/shop-online-slider-template-4f2c60.png",
    "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
    "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
  ];

  return (
    <div style={{ width: "100%" }}>
      <Carousel
        autoPlay={true}
        animation="slide"
        indicators={true}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        height={300}
      >
        {items.map((item, i) => (
          <Paper key={i}>
            <img
              src={item}
              alt={`Slide ${i}`}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

export default TestCarousel;
