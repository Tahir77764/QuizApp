const mongoose = require('mongoose');

const classCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('ClassCategory', classCategorySchema);
