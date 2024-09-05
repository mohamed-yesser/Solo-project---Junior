const express = require('express');
const router = express.Router();

// const Auth = require('../middlewares/auth')


const  {createUser,getUser,updateUser,deleteUser,getAllUsers, login , getUserByEmail , SearchUsers} = require('../controllers/user.controller');






router.post('/login', login);

router.get('/',getAllUsers)

router.get('/search/:search', SearchUsers);

router.get('/:id',getUser )

router.get('/get/:email',getUserByEmail)

router.post('/add',createUser )

router.put('/:id', updateUser)

router.delete('/:id',deleteUser)

module.exports = router;
