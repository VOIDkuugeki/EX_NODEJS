const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const foodModel = require("../models/food.model");
const categoryModel = require("../models/category.model");

const {
  createFood,
  getFood,
  getFoods,
  updateFood,
  deleteFood,
} = require("../controllers/food.controller");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get("/new", async (req, res) => {
  const categories = await categoryModel.find();
  res.render("foods/new", { categories });
});

router.get("/:id/edit", async (req, res) => {
  const food = await foodModel.findById(req.params.id).populate("category_id");
  const categories = await categoryModel.find();
  res.render("foods/edit", { food, categories });
});

router.route("/")
  .post(upload.single("img"), createFood)
  .get(getFoods);

router.route("/:id")
  .get(getFood)
  .put(upload.single("img"), updateFood)
  .patch(upload.single("img"), updateFood)
  .delete(deleteFood);

module.exports = router;