const express = require('express');
const router = express.Router();
const {
  getExamCategories,
  createExamCategory,
  updateExamCategory,
  deleteExamCategory,
} = require('../controllers/examCategoryController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', getExamCategories);
router.post('/', verifyToken, isAdmin, createExamCategory);
router.put('/:id', verifyToken, isAdmin, updateExamCategory);
router.delete('/:id', verifyToken, isAdmin, deleteExamCategory);

module.exports = router;
