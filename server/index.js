const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const seedAdmin = require('./config/seedAdmin');

// DB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('MongoDB connection successful');
    await seedAdmin(); // Seed admin user
})
.catch((err) => console.log('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.send('Quiz Play App API is running');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const quizCategoryRoutes = require('./routes/quizCategoryRoutes');
const quizRoutes = require('./routes/quizRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', quizCategoryRoutes);
app.use('/api/quizzes', quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
