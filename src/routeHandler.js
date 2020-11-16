//@ts-check
// global routes handler
import productRoutes from "./api/products/routes";

export default app => {
    app.use("/product", productRoutes);
}
