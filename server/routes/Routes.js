const express = require("express");
const router = new express.Router();
const products = require("../network/ProductSchema");
const User = require("../user/UserSchema");
const bcrypt = require("bcryptjs");
const authenicate = require("../middleware/Authenticate");

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
    console.log(individualData);

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
    // console.log("Received login for:", email);

    const userLogin = await User.findOne({ email });
    if (!userLogin) {
      return res.status(401).json("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, userLogin.password);
    const token = await userLogin.generateAuthtoken();
    console.log(token);
    res.cookie("AmazonWeb", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });

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

router.post("/addcart/:id", authenicate, async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await products.findOne({ id: id });
    if (!cart) return res.status(404).json({ error: "Product not found" });

    const user = await User.findById(req.userID);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    user.carts.push(cart);
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error("Add to cart failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get data into the cart
router.get("/cartdetails", authenicate, async (req, res) => {
  try {
    const buyuser = await User.findOne({ _id: req.userID });
    console.log(buyuser + "Buy now done");
    res.status(201).json(buyuser);
  } catch (error) {
    console.log(error + "error for buy now");
  }
});

// get user is login or not
router.get("/validuser", authenicate, async (req, res) => {
  try {
    const validuserone = await User.findOne({ _id: req.userID });
    console.log(validuserone + "user hain home k header main pr");
    res.status(201).json(validuserone);
  } catch (error) {
    console.log(error + "error for valid user");
  }
});

// for userlogout

router.get("/logout", authenicate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    res.clearCookie("eccomerce", { path: "/" });
    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
    console.log("user logout");
  } catch (error) {
    console.log(error + "jwt provide then logout");
  }
});

router.get("/remove/:id", authenicate, async (req, res) => {
  try {
    const { id } = req.params;

    req.rootUser.carts = req.rootUser.carts.filter((curel) => {
      return curel.id != id;
    });

    req.rootUser.save();
    res.status(201).json(req.rootUser);
    console.log("iteam remove");
  } catch (error) {
    console.log(error + "jwt provide then remove");
    res.status(400).json(error);
  }
});

module.exports = router;
