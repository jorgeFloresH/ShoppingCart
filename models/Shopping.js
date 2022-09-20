const mongoose = require("mongoose");
const shoppingSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    
  },
  products: {
    type: [
      {
        productId:String,
        quantity:Number,
        price:Number,
      }
    ],
    required: true,
    
  },
});

const Shopping = mongoose.model("Shopping", shoppingSchema);
module.exports = Shopping;