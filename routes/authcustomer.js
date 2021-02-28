const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const authcustomer = require("../middleware/authcustomer");

const Customers = require("../models/Customers");

// @route  GET api/authadmin
// @desc   Get logged in admin
//@access  Private
router.get("/", authcustomer, async (req, res) => {
  try {
    const customer = await Customers.findById(req.customer.id).select(
      "-password"
    );
    res.json(customer);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/authcustomer
// @desc   Auth Customer & get token
//@access  Public
router.post(
  "/",
  [
    body("email", "Please enter a valid email").not().isEmpty(),
    body("password", "Please enter a valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let customer = await Customers.findOne({ email });
      if (!customer) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = bcrypt.compare(password, customer.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Password" });
      }
      const payload = {
        customer: {
          id: customer.id,
          fname: customer.first_name,
          lname: customer.last_name,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecretCustomer"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
