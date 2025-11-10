const User = require('../models/User');
const TutorProfile = require('../models/TutorProfile'); // add this
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, role, subjects, bio } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'Please provide all fields' });

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, password, role });

  if (!user) return res.status(400).json({ message: 'Invalid user data' });

  let profile = null;
  // If the user is a tutor, create a TutorProfile immediately
  if (role === 'tutor') {
    profile = await TutorProfile.create({
      user: user._id,
      subjects: subjects || [],
      bio: bio || '',
    });
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user),
    profile, // will be null for students
  });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

module.exports = { registerUser, loginUser };
