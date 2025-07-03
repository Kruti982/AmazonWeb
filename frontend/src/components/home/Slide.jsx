import React from "react";
import Slider from "react-slick";
import { NavLink } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slide.css";

const Slide = ({ title, products }) => {
  // console.log("Slide received products:", products);
  const validProducts =
    Array.isArray(products) && products.length > 0 ? products : [];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="slide" style={{ marginTop: "3rem" }}>
      <div className="slide-container">
        <div className="slide-header">
          <h3>{title}</h3>
          <button className="view_btn">View All</button>
        </div>

        {validProducts.length === 0 ? (
          <p style={{ color: "gray", padding: "1rem" }}>
            No products available.
          </p>
        ) : (
          <Slider {...settings}>
            {validProducts.map((product) => {
              return (
                <NavLink to={`/getproductsone/${product.id}`} key={product.id}>
                  <div className="products_items">
                    <div className="product_img">
                      <img
                        src={product.url || "https://via.placeholder.com/150"}
                        alt={product.title?.shortTitle || "product"}
                        loading="lazy"
                      />
                    </div>
                    <p className="products_name">{product.title?.shortTitle}</p>
                    <p className="products_offer" style={{ color: "#007185" }}>
                      {product.discount}
                    </p>
                    <p className="products_explore">{product.tagline}</p>
                  </div>
                </NavLink>
              );
            })}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Slide;
