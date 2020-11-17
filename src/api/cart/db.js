//@ts-check
// define our DB requests for product models
import Cart from "./models";

const carts = async () => {
  const carts = await Cart.find().populate({
    path: "items.productId",
    select: "name price total",
  });
  return carts[0];
};

/**
 * @param {{ _id?: any; } & Record<string, any>} payload
 */
const addItem = async (payload) => {
  const newItem = await Cart.create(payload);
  return newItem;
};

export { carts, addItem };
