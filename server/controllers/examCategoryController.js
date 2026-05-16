const ExamCategory = require('../models/ExamCategory');

// Get all exam categories
const getExamCategories = async (req, res) => {
  try {
    const exams = await ExamCategory.find();
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch exams', error: err.message });
  }
};

// Create a new exam category (Admin only)
const createExamCategory = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });

  try {
    const newExam = new ExamCategory({ name, description });
    await newExam.save();
    res.status(201).json(newExam);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create exam', error: err.message });
  }
};

// Update an exam category (Admin only)
const updateExamCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedExam = await ExamCategory.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedExam) return res.status(404).json({ message: 'Exam not found' });
    res.status(200).json(updatedExam);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update exam', error: err.message });
  }
};

// Delete an exam category (Admin only)
const deleteExamCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExam = await ExamCategory.findByIdAndDelete(id);
    if (!deletedExam) return res.status(404).json({ message: 'Exam not found' });
    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete exam', error: err.message });
  }
};

module.exports = {
  getExamCategories,
  createExamCategory,
  updateExamCategory,
  deleteExamCategory,
};
