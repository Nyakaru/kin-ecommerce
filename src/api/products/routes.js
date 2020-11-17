//product routes
import express from 'express';

import multerUpload from "../middleware/multer";
import { createProduct, getProducts, getSingleProduct, deleteProduct, updateProduct } from "./controllers";
import { checkAuth } from "../middleware/auth";

const router = express.Router();
router.post("/product", multerUpload.single('image'), checkAuth, createProduct);
router.get("/product", checkAuth, getProducts);
router.get("/product/:id", checkAuth, getSingleProduct);
router.delete("/product/:id", checkAuth, deleteProduct);
router.put("/product/:id", checkAuth, updateProduct);

export default router;
