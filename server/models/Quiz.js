const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizCategory', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
