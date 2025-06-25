import React from "react";
import Slide from "./Slide";
import { products } from "./Productdata"; // make sure this path is correct

const Product = () => {
  return (
    <div>
      <Slide title="Deals of the Day" products={products} />
    </div>
  );
};

export default Product;
