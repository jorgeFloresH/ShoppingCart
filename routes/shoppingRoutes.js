const express = require("express");
const shoppingController = require("../controllers/shoppingController");
const authController = require("../controllers/authController");
const productRouter = express.Router();
//routes
shoppingRouter
  .route("/product")
  .all(authController.protect)
  .get(shoppingController.getAllProducts)
  .post(shoppingController.addProductCar);
shoppingRouter
  .route("/product/:id")
  .all(authController.protect)
  .delete(shoppingController.deleteProductById);
shoppingRouter
  .route("/pay")
  .all(authController.protect)
  .post(shoppingController.updateCart);


module.exports = productRouter;
