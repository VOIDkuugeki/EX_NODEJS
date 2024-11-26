const foodModel = require('../models/food.model');

module.exports = {
    createFood: async (req, res) => {
        try {
            const { name, price, address, category_id } = req.body;
            const img = req.file ? `/uploads/${req.file.filename}` : null;
            const priceNumber = Number(price);

            console.log('Uploaded File:', req.file);

            const newFood = await foodModel.create({ 
                name, 
                price: priceNumber, 
                img, 
                address, 
                category_id, 
            });
            return res.status(201).json({ message: 'Food item created successfully', food: newFood });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to create food item', error: error.message });
        }
    },
    getFoods: async (req, res) => {
        try {
            const foods = await foodModel.find();
            return res.status(200).json(foods);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to fetch foods', error: error.message });
        }
    },
    getFood: async (req, res) => {
        try {
            const category_id = req.query.category_id;
            const body_query = {};
            if (category_id) {
                body_query.category_id = category_id;
            }
            const foods = await foodModel.find(body_query).populate('category_id');
            return res.status(200).json(foods);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to fetch food', error: error.message });
        }
    },
    updateFood: async (req, res) => {
        const id = req.params.id;
        try {
            const { name, price, address, category_id } = req.body;
            const img = req.file ? `/uploads/${req.file.filename}` : null;
            const priceNumber = Number(price);
            const updatedFood = await foodModel.findByIdAndUpdate(id, { 
                name, 
                price: priceNumber, 
                img, 
                address, 
                category_id,
            }, { new: true });
            return res.status(200).json({ message: 'Food item updated successfully', food: updatedFood });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to update food item', error: error.message });
        }
    },
    deleteFood: async (req, res) => {
        const id = req.params.id;
        try {
            await foodModel.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Food item deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to delete food item', error: error.message });
        }
    }
};