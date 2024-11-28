const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const categoryModel = require("../models/category.model");

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

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

router.get("/new", (req, res) => {
  res.render("categories/new");
});

router.get("/:id/edit", async (req, res) => {
  const category = await categoryModel.findById(req.params.id);
  res.render("categories/edit", { category });
});

router.route("/").post(upload.single("img"), createCategory).get(getCategories);

router
  .route("/:id")
  .get(getCategories)
  .put(upload.single("img"), updateCategory)
  .patch(upload.single("img"), updateCategory)
  .delete(deleteCategory);

module.exports = router;
