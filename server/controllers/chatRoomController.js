const db = require('../models');

const createChatRoom = async (req, res) => {
    try {
        const { name } = req.body;
        const chatRoom = await db.ChatRoom.create({ name });
        res.status(201).send(chatRoom);
    } catch (err) {
        console.error(err);
        res.send(err);
    }
};

const addUserToChatRoom = async (req, res) => {
    try {
        const { chatRoomId, userId } = req.body;
        const chatRoom = await db.ChatRoom.findByPk(chatRoomId);
        const user = await db.User.findByPk(userId);

        if (!chatRoom || !user) {
            res.send('Chat room or user not found');
            return;
        }

        await chatRoom.addParticipant(user);
        res.status(200).send({ message: 'User added to chat room' });
    } catch (err) {
        console.error(err);
        res.send(err);
    }
};

const getChatRoomsForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await db.User.findByPk(userId, {
            include: {
                model: db.ChatRoom,
                as: 'ChatRooms'
            }
        });

        if (!user) {
            res.send('User not found');
            return;
        }

        res.status(200).send(user.ChatRooms);
    } catch (err) {
        console.error(err);
        res.send(err);
    }


   

}






module.exports = {
    createChatRoom,
    addUserToChatRoom,
    getChatRoomsForUser
};
