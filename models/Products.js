const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  short_description: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("product", ProductSchema);
