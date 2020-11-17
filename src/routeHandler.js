//@ts-check
// global routes handler
import productRoutes from "./api/products/routes";
import userRoutes from "./api/users/routes";

const routes = [productRoutes, userRoutes];

/**
 * @param {{ use: (arg0: import("express-serve-static-core").Router) => void; }} app
 */
export default (app) => {
  routes.forEach((element) => {
    app.use(element);
  });
  return app;
};
