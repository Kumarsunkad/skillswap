import User from "../models/User.js";

// Update profile (skillsOffered & skillsNeeded)
export const updateProfile = async (req, res) => {
  try {
    const { skillsOffered, skillsNeeded } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,  // we'll get this from JWT middleware
      { skillsOffered, skillsNeeded },
      { new: true }
    );

    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get logged-in user profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
