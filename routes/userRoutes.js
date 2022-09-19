const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const userRouter = express.Router();
//routes
userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.addUser);
//productRouter.route("/:id").get(productController.getProductById);
userRouter
  .route("/:id")
  .all(authController.protect)
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(userController.deleteUserById);
module.exports = userRouter;
