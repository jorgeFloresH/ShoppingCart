const express = require("express");
const shoppingController = require("../controllers/shoppingController");
const authController = require("../controllers/authController");
const productRouter = express.Router();
//routes
shoppingRouter
  .route("/")
  .all(authController.protect)
  .get(shoppingController.getAllProducts)
  .post(shoppingController.addProductCar);
shoppingRouter
  .route("/:id")
  .all(authController.protect)
  .get(shoppingController.getProductById)
  .put(shoppingController.updateProductById)
  .delete(shoppingController.deleteProductById);

module.exports = productRouter;
