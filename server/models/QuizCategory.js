const mongoose = require('mongoose');

const quizCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: null },
}, { timestamps: true, collection: 'quizCategories' });

module.exports = mongoose.model('QuizCategory', quizCategorySchema);
