const Quiz = require('../models/Quiz');
const pdfParse = require('pdf-parse');

const getQuizzes = async (req, res) => {
  const { categoryId, classId, examId } = req.query;
  const filter = {};
  if (categoryId) filter.category = categoryId;
  if (classId) filter.classCategory = classId;
  if (examId) filter.examCategory = examId;

  try {
    const quizzes = await Quiz.find(filter).populate('category').populate('classCategory').populate('examCategory');
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching quizzes', error: err.message });
  }
};

const getUserQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user.id, isUserUploaded: true })
      .populate('category')
      .populate('classCategory')
      .populate('examCategory')
      .sort({ createdAt: -1 });
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching your quizzes', error: err.message });
  }
};

const createQuiz = async (req, res) => {
  const { question, options, correctAnswer, category, classCategory, examCategory } = req.body;
  if (!question || !options || !correctAnswer || (!category)) {
    return res.status(400).json({ message: 'Fields are required (must have category)' });
  }

  try {
    const quiz = new Quiz({ question, options, correctAnswer, category, classCategory, examCategory });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Error creating quiz', error: err.message });
  }
};

const userCreateQuiz = async (req, res) => {
  const { question, options, correctAnswer } = req.body;
  if (!question || !options || !correctAnswer || options.length < 2) {
    return res.status(400).json({ message: 'Question, at least 2 options, and correct answer are required' });
  }

  try {
    const quiz = new Quiz({ 
      question, 
      options, 
      correctAnswer, 
      user: req.user.id,
      isUserUploaded: true 
    });
    await quiz.save();
    res.status(201).json({ message: 'Quiz uploaded successfully', quiz });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading quiz', error: err.message });
  }
};

const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { question, options, correctAnswer, category, classCategory, examCategory } = req.body;

  try {
    const quiz = await Quiz.findByIdAndUpdate(id, { question, options, correctAnswer, category, classCategory, examCategory }, { new: true });
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

const uploadQuizzesFromPDF = async (req, res) => {
  try {
    const { category, classCategory, examCategory } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'No PDF file attached.' });
    }
    if (!req.file.buffer || req.file.buffer.length === 0) {
      return res.status(400).json({ message: 'Attached file is empty or corrupted (0 bytes).' });
    }
    if (!category) {
      return res.status(400).json({ message: 'Category is required for bulk upload.' });
    }

    const data = await pdfParse(req.file.buffer);
    const text = data.text;

    // Pattern for: 1. Question \n A) Opt1 \n B) Opt2 \n C) Opt3 \n D) Opt4 \n Answer: A
    const regex = /(?:\d+[\.)]\s*)([\s\S]*?)(?:A[\.)]\s*)([\s\S]*?)(?:B[\.)]\s*)([\s\S]*?)(?:C[\.)]\s*)([\s\S]*?)(?:D[\.)]\s*)([\s\S]*?)(?:Answer|Correct)[\s:]*([A-D])/gi;

    let match;
    const extractedQuizzes = [];

    while ((match = regex.exec(text)) !== null) {
      const question = match[1].trim();
      const options = [
        match[2].trim(),
        match[3].trim(),
        match[4].trim(),
        match[5].trim()
      ];
      const answerLetter = match[6].toUpperCase(); // A, B, C, D
      
      const optionMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
      const answerIndex = optionMap[answerLetter];
      
      if (answerIndex !== undefined && options[answerIndex]) {
        extractedQuizzes.push({
          question,
          options,
          correctAnswer: options[answerIndex],
          category: category,
          classCategory: classCategory || undefined,
          examCategory: examCategory || undefined
        });
      }
    }

    if (extractedQuizzes.length === 0) {
      return res.status(400).json({ message: 'No valid questions found in the PDF. Please ensure the formatting follows: 1. Question A) Opt1 B) Opt2 C) Opt3 D) Opt4 Answer: A' });
    }

    const savedQuizzes = await Quiz.insertMany(extractedQuizzes);
    res.status(201).json({ message: `Successfully extracted and posted ${savedQuizzes.length} questions.` });
  } catch (err) {
    console.error('PDF Processing Error:', err);
    res.status(500).json({ message: 'Error processing PDF: ' + err.message, error: err.message });
  }
};

const userUploadQuizzesFromPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No PDF file attached.' });
    }
    if (!req.file.buffer || req.file.buffer.length === 0) {
      return res.status(400).json({ message: 'Attached file is empty or corrupted (0 bytes).' });
    }

    const data = await pdfParse(req.file.buffer);
    const text = data.text;

    const regex = /(?:\d+[\.)]\s*)([\s\S]*?)(?:A[\.)]\s*)([\s\S]*?)(?:B[\.)]\s*)([\s\S]*?)(?:C[\.)]\s*)([\s\S]*?)(?:D[\.)]\s*)([\s\S]*?)(?:Answer|Correct)[\s:]*([A-D])/gi;

    let match;
    const extractedQuizzes = [];

    while ((match = regex.exec(text)) !== null) {
      const question = match[1].trim();
      const options = [
        match[2].trim(),
        match[3].trim(),
        match[4].trim(),
        match[5].trim()
      ];
      const answerLetter = match[6].toUpperCase();
      
      const optionMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
      const answerIndex = optionMap[answerLetter];
      
      if (answerIndex !== undefined && options[answerIndex]) {
        extractedQuizzes.push({
          question,
          options,
          correctAnswer: options[answerIndex],
          user: req.user.id,
          isUserUploaded: true
        });
      }
    }

    if (extractedQuizzes.length === 0) {
      return res.status(400).json({ message: 'No valid questions found in the PDF. Please ensure the formatting follows: 1. Question A) Opt1 B) Opt2 C) Opt3 D) Opt4 Answer: A' });
    }

    await Quiz.insertMany(extractedQuizzes);
    res.status(201).json({ message: `Successfully extracted and uploaded ${extractedQuizzes.length} questions.` });
  } catch (err) {
    console.error('PDF Processing Error:', err);
    res.status(500).json({ message: 'Error processing PDF: ' + err.message, error: err.message });
  }
};

module.exports = { getQuizzes, getUserQuizzes, createQuiz, updateQuiz, deleteQuiz, uploadQuizzesFromPDF, userCreateQuiz, userUploadQuizzesFromPDF };
