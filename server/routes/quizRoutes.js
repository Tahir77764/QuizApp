const express = require('express');
const router = express.Router();
const { getQuizzes, createQuiz, updateQuiz, deleteQuiz } = require('../controllers/quizController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', getQuizzes);
router.post('/', verifyToken, isAdmin, createQuiz);
router.put('/:id', verifyToken, isAdmin, updateQuiz);
router.delete('/:id', verifyToken, isAdmin, deleteQuiz);

module.exports = router;
