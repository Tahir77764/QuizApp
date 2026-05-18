const express = require('express');
const router = express.Router();
const { getQuizzes, getUserQuizzes, createQuiz, updateQuiz, deleteQuiz, uploadQuizzesFromPDF, userCreateQuiz, userUploadQuizzesFromPDF, userDeleteQuiz } = require('../controllers/quizController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getQuizzes);
router.get('/my-quizzes', verifyToken, getUserQuizzes);
router.post('/', verifyToken, isAdmin, createQuiz);
router.post('/user-upload', verifyToken, userCreateQuiz);
router.post('/user-upload-pdf', verifyToken, upload.single('pdf'), userUploadQuizzesFromPDF);
router.post('/upload-pdf', verifyToken, isAdmin, upload.single('pdf'), uploadQuizzesFromPDF);
router.put('/:id', verifyToken, isAdmin, updateQuiz);
router.delete('/my/:id', verifyToken, userDeleteQuiz);
router.delete('/:id', verifyToken, isAdmin, deleteQuiz);

module.exports = router;
