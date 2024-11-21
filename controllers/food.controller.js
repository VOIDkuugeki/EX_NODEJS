const foodModel = require('../models/food.model');

module.exports = {
    createFood: async(req, res) => {
        const body = req.body;
        const newFood = await foodModel.create(body);
        return res.status(201).json(newFood);
    },
    getFoods: async(req, res) => {
        const foods = await foodModel.find();
        return res.status(200).json(foods);
    },
    getFood: async(req, res) => {
        const category_id = req.query.category_id;
        const body_query = {};
        if (category_id) {
            body_query.category_id = category_id;
        }
        const foods = await foodModel.find(body_query).populate('category_id');
        return res.status(200).json(foods);
    },
    updateFood: async(req, res) => {
        const id = req.params.id;
        const body = req.body;
        const updateFood = await foodModel.findByIdAndUpdate(id, body, {new: true});
        return res.status(200).json(updatedCategory);
    },
    deleteFood: async(req, res) => {
        const id = req.params.id;
        await foodModel.findByIdAndDelete(id);
        return res.status(200).json();
    }
}