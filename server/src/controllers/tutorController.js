const TutorProfile = require('../models/TutorProfile');
const User = require('../models/User');

// @desc    Create or update tutor profile
// @route   POST /api/tutors/profile
// @access  Private (tutor)
const createOrUpdateProfile = async (req, res) => {
  try {
    const { subjects, name, email, bio } = req.body;

    // Update or create TutorProfile
    let profile = await TutorProfile.findOne({ user: req.user._id });
    if (profile) {
      profile.subjects = subjects || profile.subjects;
      profile.bio = bio || profile.bio;
      await profile.save();
    } else {
      profile = await TutorProfile.create({
        user: req.user._id,
        subjects,
        bio: bio || "",
      });
    }

    // Update User info if provided
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();

    res.status(200).json({ profile, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all tutors (optionally filter by subject, case-insensitive)
// @route   GET /api/tutors
// @access  Public
const getTutors = async (req, res) => {
  try {
    const { subject } = req.query;

    // Get all tutors
    let tutors = await TutorProfile.find().populate('user', 'name email');

    // Apply case-insensitive subject filter if provided
    if (subject) {
      const filter = subject.toLowerCase();
      tutors = tutors.filter(t =>
        t.subjects.some(s => s.toLowerCase().includes(filter))
      );
    }

    // Format response
    const formatted = tutors.map(t => ({
      id: t._id,
      name: t.user.name,
 
      subjects: t.subjects,
      
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single tutor profile
// @route   GET /api/tutors/:id
// @access  Public
const getTutorById = async (req, res) => {
  try {
    const profile = await TutorProfile.findById(req.params.id).populate('user', 'name email');
    if (!profile) return res.status(404).json({ message: 'Tutor not found' });

    res.json({
      id: profile._id,
      name: profile.user.name,
      email: profile.user.email,
      subjects: profile.subjects,
      bio: profile.bio || "",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOrUpdateProfile, getTutors, getTutorById };
