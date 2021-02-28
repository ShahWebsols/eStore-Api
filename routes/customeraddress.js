const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const CustomersAddress = require("../models/CustomersAddress");
const authcustomer = require("../middleware/authcustomer");

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
    } = req.body;
    try {
      customeraddress = new CustomersAddress({
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
        customer: req.customer.id,
      });

      await customeraddress.save();
      res.json(customeraddress);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
