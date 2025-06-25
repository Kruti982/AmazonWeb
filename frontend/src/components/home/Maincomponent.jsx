import React, { useEffect } from "react";

import Banner from "./Banner";
import "./Home.css";
import Productdata from "./Productdata";
import NewNavbaar from "../newNavbaar/NewNavbaar";
import Footer from "../footer/Footer";
import Navbar from "../Navbar/Navbar";
import { getProducts } from "../redux/actions/Action";
import { useSelector, useDispatch } from "react-redux";

const Maincomponent = () => {
  const { products } = useSelector((state) => state.getproductsdata);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  console.log(products);
  return (
    <>
      <Navbar />
      <NewNavbaar />

      <section className="container">
        <div className="home_section">
          <div className="banner_part">
            <Banner />
          </div>
        </div>
        <div className="left_side">
          <Productdata title="Deals of the day" products={products} />
        </div>
        <div className="right_side">
          <h4>Festive latest Launches</h4>
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg"
            alt="rightimg"
          />
          <a href="#">see more</a>
        </div>
        <div className="center_img">
          <img
            src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg"
            alt=""
          />
        </div>
        <Productdata title="Today's Deal" products={products} />
        <Productdata title="Upto 80% off" products={products} />
        <Productdata title="Best Sellers" products={products} />
      </section>
      <Footer />
    </>
  );
};

export default Maincomponent;
