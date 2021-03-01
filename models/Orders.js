const mongoose = require("mongoose");
const OrdersSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
  },
  billingAddress: {
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
    },
  },
  shippingAddress: {
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
    },
  },
  order_status: {
    type: String,
    required: true,
    default: "Processing",
  },
  order_items: {
    type: Array,
    required: true,
  },
  order_total: {
    type: Number,
    required: true,
  },
  order_shipping: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Orders", OrdersSchema);
