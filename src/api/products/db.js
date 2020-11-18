//@ts-check
// define our DB requests for product models
import Product from "./models";

const products = async () => {
  const products = await Product.find()
  return products;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};

const addProduct = async (payload) => {
  const newProduct = await Product.create(payload);
  return newProduct;
};

const removeProduct = async (id) => {
  const product = await Product.findByIdAndRemove(id);
  return product;
};

const editProduct = async (id, updateOps) => {
    await Product.updateOne({_id: id}, {$set: updateOps})
    const updatedProduct = await Product.findById(id);
    return updatedProduct;
  }

export {
    products, getProductById, addProduct, removeProduct, editProduct
}
