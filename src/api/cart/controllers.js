//@tscheck
import Cart from "./models";
import { carts, addItem } from "./db";
import { getProductById } from "../products/db";

const addItemToCart = async (req, res) => {
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  try {
    let cart = await carts();
    let productDetails = await getProductById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid request",
      });
    }
    //If cart exists 
    if (cart) {
      // Check if index exists 
      const indexFound = cart.items.findIndex(
        (item) => item.productId.id == productId
      );
      //This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  
      if (indexFound !== 1 && quantity <= 0) {
        cart.items.splice(indexFound, 1);
        if (cart.items.length == 0) {
          cart.subTotal = 0;
        } else {
          cart.subTotal = cart.items
            .map((item) => item.total)
            .reduce((acc, next) => acc + next);
        }
      }
      //Check if product exist, just add the previous quantity with the new quantity and update the total price
      else if (indexFound !== 1) {
        cart.items[indexFound].quantity =
          cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].total =
          cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price;
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      }
      //Check if quantity is greater than 0 then add item to items array 
      else if (quantity > 0) {
        cart.items.push({
          productId: productId,
          quantity: quantity,
          price: productDetails.price,
          total: parseInt(productDetails.price * quantity),
        });
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      }
      //If quantity of price is 0 throw the error 
      else {
        return res.status(400).json({
          type: "Invalid",
          msg: "Invalid request",
        });
      }
      let data = await cart.save();
      res.status(200).json({
        type: "success",
        mgs: "Process Successful",
        data: data,
      });
    }
    // This creates a new cart and then adds the item to the cart that has been created
    else {
      const cartData = {
        items: [
          {
            productId: productId,
            quantity: quantity,
            total: parseInt(productDetails.price * quantity),
            price: productDetails.price,
          },
        ],
        subTotal: parseInt(productDetails.price * quantity),
      };
      cart = await addItem(cartData);
      // let data = await cart.save();
      res.json(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      err: err,
    });
  }
};

const getCart = async (req, res) => {
  try {
    let cart = await carts();
    if (!cart) {
      return res.status(400).json({
        type: "Invalid",
        msg: "Cart not found",
      });
    }
    res.status(200).json({
      status: true,
      data: cart,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
  }
};

const emptyCart = async (req, res) => {
  try {
    let cart = await carts();
    cart.items = [];
    cart.subTotal = 0;
    const data = await Cart.findByIdAndRemove(cart._id);
    res.status(200).json({
      type: "Success",
      mgs: "Cart has been emptied",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
  }
};

export { addItemToCart, getCart, emptyCart };
