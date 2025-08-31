import User from "../models/User.js";

// Find matches for logged-in user
export const findMatches = async (req, res) => {
  try {
    const loggedInUser = await User.findById(req.user.id);
    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 1: Find users who OFFER what I NEED
    const oneWayMatches = await User.find({
      skillsOffered: { $in: loggedInUser.skillsNeeded },
      _id: { $ne: loggedInUser._id } // exclude self
    });

    // Step 2 (optional): Filter for mutual matches
    const mutualMatches = oneWayMatches.filter(otherUser =>
      otherUser.skillsNeeded.some(skill => loggedInUser.skillsOffered.includes(skill))
    );

    res.json({
      matches: mutualMatches.length > 0 ? mutualMatches : oneWayMatches
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
