const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const authadmin = require("../middleware/authadmin");
const Admin = require("../models/Admins");

// @route  GET api/authadmin
// @desc   Get logged in admin
//@access  Private
router.get("/", authadmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.json(admin);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/auth
// @desc   Auth Admin & get token
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
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Password" });
      }
      const payload = {
        admin: {
          id: admin.id,
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
