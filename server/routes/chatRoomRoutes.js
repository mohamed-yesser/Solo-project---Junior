const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chatRoomController');

router.post('/create', chatRoomController.createChatRoom);
router.post('/addUser', chatRoomController.addUserToChatRoom);
router.get('/user/:userId', chatRoomController.getChatRoomsForUser);

module.exports = router;
