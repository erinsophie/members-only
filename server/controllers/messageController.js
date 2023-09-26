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

exports.newMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndRemove(req.query.id);
    res.status(200).send("Message deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
