const Message = require("../models/message");

// get all messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    return res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
