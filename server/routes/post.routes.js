const express = require('express');
const router = express.Router();


const { createPost, getPost , getAllPosts , deletePost , getOthersPost, updatePost ,getPostsByUser} = require('../controllers/post.controller');





router.post('/add', createPost)

router.get('/:id', getPost)

router.get( '/get/:id',getOthersPost)

router.get('/',getAllPosts)

router.delete('/:id',deletePost)

router.put('/:id',updatePost)



module.exports = router;