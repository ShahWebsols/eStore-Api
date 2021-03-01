const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const Orders = require("../models/Orders");
const authcustomer = require("../middleware/authcustomer");
const authadmin = require("../middleware/authadmin");

// @route  GET api/orders
// @desc   Fetch orders
//@access  Private
router.get("/", authcustomer, async (req, res) => {
  try {
    const orders = await Orders.find({
      customer: req.customer.id,
    }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
// @route  POST api/orders
// @desc   Register orders
//@access  Private
router.post(
  "/",
  [
    authcustomer,
    [
      body("first_name", "Please add First name..").not().isEmpty(),
      body("last_name", "Please add Last name..").not().isEmpty(),
      body("email", "Please enter a valid email address").isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      first_name,
      last_name,
      company_name,
      country,
      street_address1,
      street_address2,
      state,
      city,
      zipcode,
      phone,
      email,
      use_different_shipping_address,
      ship_first_name,
      ship_last_name,
      ship_company_name,
      ship_country,
      ship_street_address1,
      ship_street_address2,
      ship_state,
      ship_city,
      ship_zipcode,
      ship_phone,
      ship_email,
      order_items,
      order_shipping,
      order_total,
      order_status,
    } = req.body;
    try {
      if (use_different_shipping_address) {
        order = new Orders({
          order_status,
          customer: req.customer.id,
          billingAddress: {
            first_name,
            last_name,
            company_name,
            country,
            street_address1,
            street_address2,
            state,
            city,
            zipcode,
            phone,
            email,
          },
          shippingAddress: {
            first_name: ship_first_name,
            last_name: ship_last_name,
            company_name: ship_company_name,
            country: ship_country,
            street_address1: ship_street_address1,
            street_address2: ship_street_address2,
            state: ship_state,
            city: ship_city,
            zipcode: ship_zipcode,
            phone: ship_phone,
            email: ship_email,
          },
          order_items,
          order_total,
          order_shipping,
        });
      } else {
        order = new Orders({
          order_status,
          customer: req.customer.id,
          billingAddress: {
            first_name,
            last_name,
            company_name,
            country,
            street_address1,
            street_address2,
            state,
            city,
            zipcode,
            phone,
            email,
          },
          shippingAddress: {
            first_name,
            last_name,
            company_name,
            country,
            street_address1,
            street_address2,
            state,
            city,
            zipcode,
            phone,
            email,
          },
          order_items,
          order_total,
          order_shipping,
        });
      }
      await order.save();
      res.json(order);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PuT api/customeraddress
// @desc   Edit Customeraddress
//@access  Private
router.put("/:id", authadmin, async (req, res) => {
  const { order_status } = req.body;

  try {
    let order = await Orders.findOne({
      _id: req.params.id,
    });
    if (!order) {
      return res.status(404).json({ msg: "Order not Found" });
    }

    const condition = { _id: req.params.id };
    order = await Orders.findOneAndUpdate(
      condition,
      { $set: { order_status: order_status } },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
