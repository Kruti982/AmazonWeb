import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../profile/SignIn/SignIn";
import SignUp from "../profile/SignUp/SignUp";
import Home from "../home/Maincomponent";
import Buynow from "../buynow/Buynow";
import AddToCart from "../addToCart/AddToCart";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/getproductsone/:id" element={<AddToCart />} />
      <Route path="/buynow" element={<Buynow />} />
    </Routes>
  );
};

export default Routing;
