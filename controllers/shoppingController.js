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
  const userCart= req.user._id;
  try{
    let cart= await Shopping.findOne({userCart});
    if(cart){
      let statusCart=cart.status;
      let indexProduct=cart.products.findIndex(p=>p.productId==req.product);
      if(statusCart=="PENDING"){
        if(indexProduct>-1){
          let productItem=cart.products[indexProduct];
          productItem.quantity=productItem.quantity+req.body.product.quantity;
        }else{
          cart.products.push(req.body);
        }
        cart = await Shopping.save();
        res.status(200).json({
          status: "success",
          data: {
            product: cart,
          },
        }); 
      }else{
        const newCart=await Shopping.create(req.body);
        res.status(200).json({
          status: "success",
          data: {
            product: newCart,
          },
        });
      }

    }
  }catch(err){
    console.log(err);
    res.status(400).json({
      status: "Someting went wrong",
    });;
  }
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

exports.updateCart = catchAsync(async(req, res) => { 
  const userCart= req.user._id;
  try{
    let cart= await Shopping.findOne({userCart});
    if(cart){
      let statusCart=cart.status;
      let indexProduct=cart.products.findIndex(p=>p.productId==req.product);
      if(statusCart=="PENDING"){
        if(indexProduct>-1){
            cart.status="PAID";
            res.status(200).json({
              status: "success",
              data: {
                product: cart.products,
              },
            });

        }else{
          res.status(404).json({
            status: "not found",
          });
        }
      }else{
        res.status(404).json({
          status: "not found",
        });
      }

    }
  }catch(err){
    console.log(err);
    res.status(400).json({
      status: "Someting went wrong",
    });;
  }

});

exports.deleteProductById = catchAsync(async(req, res) => {
  const userCart= req.user._id;
  try{
    let cart= await Shopping.findOne({userCart});
    if(cart){
      let statusCart=cart.status;
      let indexProduct=cart.products.findIndex(p=>p.productId==req.product);
      if(statusCart=="PENDING"){
        if(indexProduct>-1){
          const foundProduct = await Shopping.products.findByIdAndDelete(req.params.id);
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
        }else{
          res.status(404).json({
            status: "not found",
          });
        }
      }else{
        res.status(404).json({
          status: "not found",
        });
      }

    }
  }catch(err){
    console.log(err);
    res.status(400).json({
      status: "Someting went wrong",
    });;
  }
});
