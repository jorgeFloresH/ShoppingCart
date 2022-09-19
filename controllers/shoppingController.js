const fs = require("fs");
const Shopping = require("../models/Shopping");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const carProducts = await Shopping.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: carProducts.length,
    data: {
      carProducts,
    },
  });
});

exports.addProductCar = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.updateProductById = catchAsync(async(req, res) => {
  const foundProduct = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});

  if (foundProduct) {
    res.status(201).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.deleteProductById = catchAsync(async(req, res) => {

  const foundProduct = await Product.findByIdAndDelete(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
