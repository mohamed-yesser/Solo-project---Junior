const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/media.controller');


router.post('/', mediaController.createMedia);


router.get('/', mediaController.getAllMedia);


router.get('/:id', mediaController.getMediaById);


router.put('/:id', mediaController.updateMedia);


router.get('/user/:userId', mediaController.getMediaByUserId);


router.get('/post/:postId', mediaController.getMediaByPostId);


router.get('/profile/:userId', mediaController.getProfilePictureByUserId);


module.exports = router;
