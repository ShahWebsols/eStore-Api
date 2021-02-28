const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Customers = require("../models/Customers");

// @route  POST api/customers
// @desc   Register Customers
//@access  public
router.post(
  "/",
  [
    body("first_name", "Please add First name..").not().isEmpty(),
    body("last_name", "Please add Last name..").not().isEmpty(),
    body("email", "Please enter a valid email address").isEmail(),
    body("password", "Please enter a password 6 or more letters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { first_name, last_name, company_name, email, password } = req.body;
    try {
      let customer = await Customers.findOne({ email });
      if (customer) {
        return res.status(400).json({ msg: "Customer already exits" });
      }

      customer = new Customers({
        first_name,
        last_name,
        company_name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      customer.password = await bcrypt.hash(password, salt);
      await customer.save();
      const payload = {
        customer: {
          id: customer.id,
          fname: customer.first_name,
          lname: customer.last_name,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecretAdmin"),
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
