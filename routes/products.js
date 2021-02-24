const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authadmin = require("../middleware/authadmin");
const Products = require("../models/Products");
// @route  GET api/products
// @desc   Get all products
// @access
router.get("/", async (req, res) => {
  try {
    const products = await Products.find({});
    res.json(products);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/products
// @desc   Add a products
// @access  Private
router.post(
  "/",
  [authadmin, [body("name", "Plz enter name").not().isEmpty()]],
  async (req, res) => {
    //validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      price,
      description,
      short_description,
      stock,
      shippment,
    } = req.body;
    try {
      const newProduct = new Products({
        name,
        price,
        description,
        short_description,
        stock,
        shippment,
      });
      const product = await newProduct.save();
      res.json(product);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/products/:id
// @desc   Edit a Product
// @access  Private
router.put("/:id", authadmin, async (req, res) => {
  const {
    name,
    price,
    description,
    short_description,
    stock,
    shippment,
  } = req.body;

  // buiding product object
  const productFeilds = {};
  if (name) productFeilds.name = name;
  if (price) productFeilds.price = price;
  if (description) productFeilds.description = description;
  if (short_description) productFeilds.short_description = short_description;
  if (stock) productFeilds.stock = stock;
  if (shippment) productFeilds.shippment = shippment;

  try {
    let product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not Found" });
    }
    product = await Products.findByIdAndUpdate(
      req.params.id,
      { $set: productFeilds },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/products/:id
// @desc   Delete a Product
// @access  Private
router.delete("/:id", authadmin, async (req, res) => {
  try {
    let product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not Found" });
    }

    await Products.findByIdAndRemove(req.params.id);

    res.json({ msg: "Product Deleted Sucessfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
