const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authadmin = require("../middleware/authadmin");
const Categories = require("../models/Categories");
// @route  GET api/categories
// @desc   Get all categories
// @access
router.get("/", async (req, res) => {
  try {
    const categories = await Categories.find({});
    res.json(categories);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  GET api/categories/:id
// @desc   Get single category
// @access
router.get("/:id", async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    res.json(category);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/categories
// @desc   Add a category
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

      description,
    } = req.body;
    try {
      const newCategory = new Categories({
        name,

        description,
      });
      const category = await newCategory.save();
      res.json(category);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/categories/:id
// @desc   Edit a category
// @access  Private
router.put("/:id", authadmin, async (req, res) => {
  const {
    name,

    description,
  } = req.body;

  // buiding category object
  const categoryFeilds = {};
  if (name) categoryFeilds.name = name;
  if (description) categoryFeilds.description = description;

  try {
    let category = await Categories.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not Found" });
    }
    category = await Categories.findByIdAndUpdate(
      req.params.id,
      { $set: categoryFeilds },
      { new: true }
    );

    res.json(category);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/categories/:id
// @desc   Delete a category
// @access  Private
router.delete("/:id", authadmin, async (req, res) => {
  try {
    let category = await Categories.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not Found" });
    }

    await Categories.findByIdAndRemove(req.params.id);

    res.json({ msg: "Category Deleted Sucessfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
