const Products = require("../network/ProductSchema");
const productData = require("../product/Products");

const DefaultData = async () => {
  try {
    await Products.deleteMany({});
    const storeData = await Products.insertMany(productData);
    console.log(storeData);
  } catch (error) {
    console.log("Something went wrong", error.message);
  }
};

module.exports = DefaultData;
