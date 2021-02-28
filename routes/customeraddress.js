const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const CustomersAddress = require("../models/CustomersAddress");
const authcustomer = require("../middleware/authcustomer");

// @route  GET api/customeraddress
// @desc   Fetch Customeraddress
//@access  Private
router.get("/", authcustomer, async (req, res) => {
  try {
    const customerAddress = await CustomersAddress.findOne({
      customer: req.customer.id,
    }).sort({ date: -1 });
    res.json(customerAddress);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
// @route  POST api/customeraddress
// @desc   Register Customeraddress
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
    } = req.body;
    try {
      if (use_different_shipping_address) {
        customeraddress = new CustomersAddress({
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
        });
      } else {
        customeraddress = new CustomersAddress({
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
        });
      }
      await customeraddress.save();
      res.json(customeraddress);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PuT api/customeraddress
// @desc   Edit Customeraddress
//@access  Private
router.put("", authcustomer, async (req, res) => {
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
  } = req.body;

  // buiding contact object
  const billingFeilds = {};
  if (first_name) billingFeilds.first_name = first_name;
  if (last_name) billingFeilds.last_name = last_name;
  if (company_name) billingFeilds.company_name = company_name;
  if (country) billingFeilds.country = country;
  if (state) billingFeilds.state = state;
  if (city) billingFeilds.city = city;
  if (zipcode) billingFeilds.zipcode = zipcode;
  if (street_address1) billingFeilds.street_address1 = street_address1;
  if (street_address2) billingFeilds.street_address2 = street_address2;
  if (email) billingFeilds.email = email;
  if (phone) billingFeilds.phone = phone;

  const shippingFeilds = {};
  if (ship_first_name) shippingFeilds.first_name = ship_first_name;
  if (ship_last_name) shippingFeilds.last_name = ship_last_name;
  if (ship_company_name) shippingFeilds.company_name = ship_company_name;
  if (ship_country) shippingFeilds.country = ship_country;
  if (ship_state) shippingFeilds.state = ship_state;
  if (ship_city) shippingFeilds.city = ship_city;
  if (ship_zipcode) shippingFeilds.zipcode = ship_zipcode;
  if (ship_street_address1)
    shippingFeilds.street_address1 = ship_street_address1;
  if (ship_street_address2)
    shippingFeilds.street_address2 = ship_street_address2;
  if (ship_email) shippingFeilds.email = ship_email;
  if (ship_phone) shippingFeilds.phone = ship_phone;

  customeraddressFeilds = {
    billingAddress: billingFeilds,
    shippingAddress: shippingFeilds,
  };

  try {
    let customeraddress = await CustomersAddress.findOne({
      customer: req.customer.id,
    });
    if (!customeraddress) {
      return res.status(404).json({ msg: "Contact not Found" });
    }

    const condition = { customer: req.customer.id };
    customeraddress = await CustomersAddress.findOneAndUpdate(
      condition,
      { $set: customeraddressFeilds },
      { new: true }
    );

    res.json(customeraddress);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
