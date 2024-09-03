const express = require('express');
const router = express.Router();

const { createComment, getComment, getAllComments, updateComment, deleteComment } = require('../controllers/comment.controller');


router.post('/add', createComment); 

router.get('/:id', getComment); 

router.get('/', getAllComments); 

router.put('/:id', updateComment); 

router.delete('/:id', deleteComment) 



module.exports = router;
