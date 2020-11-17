//@ts-check
// global routes handler
import productRoutes from "./api/products/routes";
import userRoutes from "./api/users/routes";
import cartRoutes from "./api/cart/routes";

const routes = [productRoutes, userRoutes, cartRoutes];

/**
 * @param {{ use: (arg0: import("express-serve-static-core").Router) => void; }} app
 */
export default (app) => {
  routes.forEach((element) => {
    app.use(element);
  });
  return app;
};
