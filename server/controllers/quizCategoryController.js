const QuizCategory = require('../models/QuizCategory');

const getCategories = async (req, res) => {
  try {
    const categories = await QuizCategory.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
};

const createCategory = async (req, res) => {
  const { name, icon } = req.body;
  if (!name) return res.status(400).json({ message: 'Category name is required' });

  try {
    const category = new QuizCategory({ name, icon });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error creating category', error: err.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, icon } = req.body;

  try {
    const category = await QuizCategory.findByIdAndUpdate(id, { name, icon }, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error updating category', error: err.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await QuizCategory.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category', error: err.message });
  }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
