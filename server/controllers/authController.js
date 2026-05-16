const User = require('../models/User');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  let { email, password } = req.body;
  if (email) email = email.toLowerCase();

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error in signup:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;
  if (email) email = email.toLowerCase();

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if it is an admin
    const admin = await Admin.findOne({ email });
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ message: 'Admin logged in successfully', token, role: 'admin', user: admin });
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }

    // Check if it is a user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ message: 'Logged in successfully', token, role: 'user', user });

  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

module.exports = { signup, login };
