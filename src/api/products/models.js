//@ts-check
// define all product models
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please include the product name"],
  },
  price: {
    type: String,
    required: [true, "Please include the product price"],
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Please include the product description"],
  },
  vendor: {
    type: String,
    required: [true, "Please include the product vendor name"],
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
