const { Media } = require('../models');

module.exports = {

    // createMedia: async (req, res) => {
    //     try {
    //         const media = await Media.create(req.body);
    //         res.status(201).send(media);
    //     } catch (err) {
    //         console.log('Error creating media:', err);
    //         res.status(500).send('Error creating media');
    //     }
    // },

    getAllMedia: async (req, res) => {
        try {
            const media = await Media.findAll();
            res.status(200).send(media);
        } catch (err) {
            console.log('Error retrieving media:', err);
            res.status(500).send('Error retrieving media');
        }
    },

    updateMedia: async (req, res) => {
        const id = req.params.id;

        try {
            const media = await Media.update(req.body, {
                where: { id: id }
            });
            res.status(200).send(media);
        } catch (err) {
            console.log('Error updating media:', err);
            res.status(500).send('Error updating media');
        }
    },

    getMediaByUserId: async (req, res) => {
        try {
            const media = await Media.findAll({
                where: { UserId: req.params.userId }
            });
            res.status(200).send(media);
        } catch (err) {
            console.log('Error retrieving media by user ID:', err);
            res.status(500).send('Error retrieving media by user ID');
        }
    },

    getMediaByPostId: async (req, res) => {
        try {
            const media = await Media.findAll({
                where: { PostId: req.params.postId }
            });
            res.status(200).send(media);
        } catch (err) {
            console.log('Error retrieving media by post ID:', err);
            res.status(500).send('Error retrieving media by post ID');
        }
    },

    getMediaById: async (req, res) => {
        try {
            const media = await Media.findByPk(req.params.id);
            res.status(200).send(media);
        } catch (err) {
            console.log('Error retrieving media by ID:', err);
            res.status(500).send('Error retrieving media by ID');
        }
    },

        getProfilePictureByUserId: async (req, res) => {
    try {
        const media = await Media.findOne({
            where: { UserId: req.params.userId, type: 'profile' }
        });
        res.status(200).send(media);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
},


createMedia: async (req, res) => {
    try {
        const { link, type, UserId } = req.body;
        const media = await Media.create({ link, type, UserId });
        res.status(201).send(media);
    } catch (err) {
        console.log('Error creating media:', err);
        res.status(500).send('Error creating media');
    }
},

};
