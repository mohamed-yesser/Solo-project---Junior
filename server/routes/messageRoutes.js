const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/send', messageController.sendMessage);
router.get('/chatRoom/:chatRoomId', messageController.getMessagesForChatRoom);
router.post('/del/:Id', messageController.deleteMessage);
module.exports = router;
