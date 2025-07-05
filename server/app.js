require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const connectDB = require("./network/Connection");
const Products = require("./network/ProductSchema");
const DefaultData = require("./defaultData/DefaultData");
const cors = require("cors");
const router = require("./routes/Routes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(router);

connectDB();
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
// DefaultData();
