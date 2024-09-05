const express = require('express');
const router = express.Router();

const { addFriend, getFriends, deleteFriend , getAllFriendships} = require('../controllers/friendship.controller');


router.post('/add', addFriend);

router.get('/get/all', getAllFriendships);

router.get('/:userId', getFriends);

router.delete('/:userId/:friendId', deleteFriend);

module.exports = router;