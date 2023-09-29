const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/", messageController.getMessages);
router.post("/", messageController.newMessage);
router.delete("/:id", messageController.deleteMessage);

module.exports = router;
