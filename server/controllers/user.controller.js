const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {


    createUser: async (req, res) => {
        try {
            const { name, email, password ,age} = req.body;
            // Check if the email exists
            const userExists = await User.findOne({
                where: {email}
            });
            if (userExists) {
                return res.status(400).send('Email is already associated with an account');
            }
    
    
            await User.create({
                name,
                email,
                password: await bcrypt.hash(password, 15),
                age
            });


            return res.status(200).send('Registration successful');

        } catch (err) {
            // return res.status(500).send('Error in registering user');
            throw err;
            
        }
    },


    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            if (users) {
                res.status(200).send(users);
            } else {
                res.status(404).send('No Users Found.');
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                res.status(200).send(user);
            } 
        } catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    },


    updateUser: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.update(req.body);
                res.status(200).send(user);
            } else {
                res.status(404).send('User not found.');
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },




    deleteUser: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.destroy();
                res.status(204).send();
            } else {
                res.status(404).send('User not found.');
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },


    login : async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {email}
            });
            if (!user) {
                return res.status(404).json('Email not found');
            }
    
    
            // Verify password
            const passwordValid = await bcrypt.compare(password, user.password);
            if (!passwordValid) {
                return res.status(404).json('Incorrect email and password combination');
            }
    
    
            // Authenticate user with jwt
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_REFRESH_EXPIRATION
            });
       
            res.status(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                accessToken: token,
            });
        } catch (err) {
            // return res.status(500).send('Sign in error');
            throw err
        }
    }

    
};




    

