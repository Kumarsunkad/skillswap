import Request from "../models/Request.js";

// Send request
export const sendRequest = async (req, res) => {
  try {
    const { toUserId } = req.body;

    // Prevent sending request to self
    if (toUserId === req.user.id) {
      return res.status(400).json({ message: "You cannot send request to yourself" });
    }

    // Check if request already exists
    const existing = await Request.findOne({ from: req.user.id, to: toUserId });
    if (existing) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const newRequest = await Request.create({
      from: req.user.id,
      to: toUserId,
    });

    res.json({ message: "Request sent successfully", request: newRequest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get requests received
export const getRequests = async (req, res) => {
  try {
    const requests = await Request.find({ to: req.user.id, status: "pending" })
      .populate("from", "name email skillsOffered skillsNeeded");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Respond to request
export const respondRequest = async (req, res) => {
  try {
    const { requestId, action } = req.body; // action = "accepted" | "rejected"

    const request = await Request.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.to.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = action;
    await request.save();

    res.json({ message: `Request ${action}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get accepted connections
export const getConnections = async (req, res) => {
  try {
    const connections = await Request.find({
      $or: [
        { from: req.user.id, status: "accepted" },
        { to: req.user.id, status: "accepted" }
      ]
    })
      .populate("from", "name email skillsOffered skillsNeeded")
      .populate("to", "name email skillsOffered skillsNeeded");

    res.json(connections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
