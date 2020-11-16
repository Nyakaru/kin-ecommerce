//product routes
import express from 'express';
import multerUpload from "../middleware/multer";
import { createProduct, getProducts, getSingleProduct, deleteProduct, updateProduct } from "./controllers"

const router = express.Router();
router.post("/", multerUpload.single('image'), createProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
