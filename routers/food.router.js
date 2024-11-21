const express = require("express");
const router = express.Router();

const {
    createFood,
    getFood,
    getFoods,
    updateFood,
    deleteFood,
} = require("../controllers/food.controller");

router
    .route("/")
    .post(createFood)
    .get(getFoods);

router
    .route("/:id")
    .get(getFood)
    .put(updateFood)
    .patch(updateFood)
    .delete(deleteFood);

module.exports = router;