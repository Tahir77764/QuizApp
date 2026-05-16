const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizCategory', required: false },
  classCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassCategory', required: false },
  examCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ExamCategory', required: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isUserUploaded: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
