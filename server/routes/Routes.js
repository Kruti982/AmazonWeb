const express = require("express");
const router = new express.Router();
const products = require("../network/ProductSchema");
const User = require("../user/UserSchema");
const bcrypt = require("bcryptjs");

router.get("/getproductsdata", async (req, res) => {
  try {
    const productData = await products.find();
    // console.log(productData);
    res.status(200).json(productData);
  } catch (error) {
    // console.log("Something went wrong", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const individualData = await products.findOne({ id });

    res.status(200).json(individualData);
  } catch (error) {
    res.status(500).json(individualData);
    console.log("Error", error);
  }
});
//Data registration
router.post("/userregistration", async (req, res) => {
  const { fname, email, mobile, password } = req.body;
  if (!fname || !email || !mobile || !password) {
    res.status(401).json({ error: "Please fill all fields" });
  }
  try {
    const preUser = await User.findOne({ email: email });
    if (preUser) {
      res.status(401).json({ error: "User Already Exist" });
    } else {
      const finalUser = new User({ fname, email, mobile, password });
      const storeData = await finalUser.save();
      res.status(200).json(storeData);
    }
  } catch (error) {
    console.log("error", error);
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Please fill all data");
  }

  try {
    console.log("Received login for:", email);

    const userLogin = await User.findOne({ email });
    if (!userLogin) {
      return res.status(401).json("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);
    console.log("Password match:", isMatch);

    if (isMatch) {
      return res.status(200).json("Login successful");
    } else {
      return res.status(401).json("Invalid email or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ error: "Server Error", details: error.message });
  }
});

module.exports = router;
