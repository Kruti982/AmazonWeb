const express = require("express");
const router = new express.Router();
const products = require("../network/ProductSchema");

router.get("/getproductsdata", async (req, res) => {
  try {
    const productData = await products.find();
    console.log(productData);
    res.status(200).json(productData);
  } catch (error) {
    console.log("Something went wrong", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
