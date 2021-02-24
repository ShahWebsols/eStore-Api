const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../models/Admins");

// @route  POST api/admins
// @desc   Register Admin
//@access  public
router.post(
  "/",
  [
    body("name", "Please add name..").not().isEmpty(),
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
    const { name, email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res.status(400).json({ msg: "Admin already exits" });
      }

      admin = new Admin({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      await admin.save();
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
