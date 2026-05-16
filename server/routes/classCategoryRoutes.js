const express = require('express');
const router = express.Router();
const {
  getClassCategories,
  createClassCategory,
  updateClassCategory,
  deleteClassCategory,
} = require('../controllers/classCategoryController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', getClassCategories);
router.post('/', verifyToken, isAdmin, createClassCategory);
router.put('/:id', verifyToken, isAdmin, updateClassCategory);
router.delete('/:id', verifyToken, isAdmin, deleteClassCategory);

module.exports = router;
