const Quiz = require('../models/Quiz');

const getQuizzes = async (req, res) => {
  const { categoryId } = req.query;
  const filter = categoryId ? { category: categoryId } : {};

  try {
    const quizzes = await Quiz.find(filter).populate('category');
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching quizzes', error: err.message });
  }
};

const createQuiz = async (req, res) => {
  const { question, options, correctAnswer, category } = req.body;
  if (!question || !options || !correctAnswer || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const quiz = new Quiz({ question, options, correctAnswer, category });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Error creating quiz', error: err.message });
  }
};

const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { question, options, correctAnswer, category } = req.body;

  try {
    const quiz = await Quiz.findByIdAndUpdate(id, { question, options, correctAnswer, category }, { new: true });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Error updating quiz', error: err.message });
  }
};

const deleteQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting quiz', error: err.message });
  }
};

module.exports = { getQuizzes, createQuiz, updateQuiz, deleteQuiz };
