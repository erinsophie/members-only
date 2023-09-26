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
    const result = await Message.findByIdAndRemove(req.query.id);
    if (result) {
      // indicate that the message was successfully deleted
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
