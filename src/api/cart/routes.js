//cart routes
import express from 'express';

import { addItemToCart, getCart, emptyCart } from "./controllers";
import { checkAuth } from "../middleware/auth";

const router = express.Router();
router.post("/cart", checkAuth, addItemToCart);
router.get("/cart", checkAuth, getCart);
router.delete("/cart/empty", checkAuth, emptyCart);

export default router;
