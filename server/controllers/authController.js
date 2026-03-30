const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = async (req, res) => {
  const { email, type } = req.body; // type: 'login' or 'signup'
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    let user = await User.findOne({ email });

    if (type === 'login' && !user) {
      return res.status(404).json({ message: 'User not found. Please sign up first.' });
    }

    if (type === 'signup' && user) {
      return res.status(400).json({ message: 'User already exists. Please login.' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    if (!user) {
      user = new User({ email, otp, otpExpires, isVerified: false });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
    }

    await user.save();

    console.log(`OTP generated for ${email} (${type}): ${otp}`);
    await sendEmail(
      email,
      type === 'signup' ? 'Quiz Play Signup OTP' : 'Quiz Play Login OTP',
      `Your OTP for Quiz Play ${type} is: ${otp}`,
      `<h2>Welcome to Quiz Play!</h2><p>Your OTP for ${type} is: <b>${otp}</b></p><p>This OTP expires in 10 minutes.</p>`
    );
    console.log(`Email successfully sent to ${email}`);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Error in sendOTP:', err);
    res.status(500).json({ message: 'Failed to send OTP', error: err.message });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    const user = await User.findOne({ email, otp });

    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    user.otp = null;
    user.otpExpires = null;
    user.isVerified = true;
    await user.save();

    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: 'OTP verified successfully', token, user });
  } catch (err) {
    console.error('Error in verifyOTP:', err);
    res.status(500).json({ message: 'Failed to verify OTP', error: err.message });
  }
};

module.exports = { sendOTP, verifyOTP };
