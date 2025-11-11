const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, subjects, bio } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'Please provide all fields' });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password, role });
    if (!user) return res.status(400).json({ message: 'Invalid user data' });

    let profile = null;
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
      profile,
    });
  } catch (err) {
    console.error(err); // log the actual error in Render
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user),
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
module.exports = { registerUser, loginUser };
