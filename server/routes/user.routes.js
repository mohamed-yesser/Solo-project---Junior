const express = require('express');
const router = express.Router();

// const Auth = require('../middlewares/auth')


const  {createUser,getUser,updateUser,deleteUser,getAllUsers, login} = require('../controllers/user.controller');






router.post('/login', login);

router.get('/',getAllUsers)

router.get('/:id',getUser )

router.post('/add',createUser )

router.put('/:id', updateUser)

router.delete('/:id',deleteUser)

module.exports = router;
