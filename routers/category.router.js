const express = require("express");
const router = express.Router();
const categoryModel = require("../models/category.model");

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.get("/new", (req, res) => {
  res.render("categories/new");
});

router.get("/:id/edit", async (req, res) => {
  const category = await categoryModel.findById(req.params.id);
  res.render("categories/edit", { category });
});

router.route("/").post(createCategory).get(getCategories);

router
  .route("/:id")
  .get(getCategories)
  .put(updateCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = router;
