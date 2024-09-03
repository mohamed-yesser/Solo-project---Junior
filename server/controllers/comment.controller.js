const { Comment } = require('../models');

module.exports = {



    createComment: async (req, res) => {
        try {
            const comment = await Comment.create(req.body);
            res.status(201).send(comment);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },

    getComment: async (req, res) => {
        try {
            const comment = await Comment.findByPk(req.params.id, {
                include: [
                    { model: User },
                    { model: Post }
                ]
            });
           
            res.status(200).send(comment)

        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },



    getAllComments: async (req, res) => {


        try {
            const comments = await Comment.findAll();
            res.status(200).send(comments);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },


    updateComment: async (req, res) => {
        try {
            const comment = await comment.update(req.body);
                res.status(200).send(comment);
            
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },

    deleteComment: async (req, res) => {
        try {
            const comment = await comment.destroy();
            res.status(204).send();
            
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
};

