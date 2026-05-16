const ClassCategory = require('../models/ClassCategory');

// Get all class categories
const getClassCategories = async (req, res) => {
  try {
    const classes = await ClassCategory.find();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch classes', error: err.message });
  }
};

// Create a new class category (Admin only)
const createClassCategory = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });

  try {
    const newClass = new ClassCategory({ name, description });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create class', error: err.message });
  }
};

// Update a class category (Admin only)
const updateClassCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedClass = await ClassCategory.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedClass) return res.status(404).json({ message: 'Class not found' });
    res.status(200).json(updatedClass);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update class', error: err.message });
  }
};

// Delete a class category (Admin only)
const deleteClassCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClass = await ClassCategory.findByIdAndDelete(id);
    if (!deletedClass) return res.status(404).json({ message: 'Class not found' });
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete class', error: err.message });
  }
};

module.exports = {
  getClassCategories,
  createClassCategory,
  updateClassCategory,
  deleteClassCategory,
};
