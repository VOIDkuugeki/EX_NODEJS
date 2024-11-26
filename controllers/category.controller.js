const categoryModel = require('../models/category.model');

module.exports = {
    createCategory: async (req, res) => {
        try {
            const body = req.body;
            const newCategory = await categoryModel.create(body);
            return res.status(201).json(newCategory);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to create category', error: error.message });
        }
    },
    getCategories: async (req, res) => {
        try {
            const categories = await categoryModel.find();
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
        }
    },
    updateCategory: async (req, res) => {
        const { id } = req.params;
        try {
            const body = req.body;
            const updatedCategory = await categoryModel.findByIdAndUpdate(id, body, { new: true });
            return res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to update category', error: error.message });
        }
    },
    deleteCategory: async (req, res) => {
        const { id } = req.params;
        try {
            await categoryModel.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to delete category', error: error.message });
        }
    }
};