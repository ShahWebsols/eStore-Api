const mongoose = require("mongoose");
const CustomerAddressSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  street_address1: {
    type: String,
    required: true,
  },
  street_address2: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("customeraddress", CustomerAddressSchema);
