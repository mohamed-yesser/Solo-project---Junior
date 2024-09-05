const db = require('../models');

const sendMessage = async (req, res) => {
    try {
        const { ChatRoomId, UserId, content } = req.body;
        const chatRoom = await db.ChatRoom.findByPk(ChatRoomId);
        const user = await db.User.findByPk(UserId);

        if (!chatRoom || !user) {
            res.send('Chat room or user not found');
            return;
        }

        const message = await db.Message.create({ ChatRoomId, UserId, content });
        res.status(201).send(message);
    } catch (err) {
        console.error(err);
        res.send(err);
    }
};

const getMessagesForChatRoom = async (req, res) => {
    try {
        const { chatRoomId } = req.params;
        const messages = await db.Message.findAll({
            where: { chatRoomId },
            include: [
                {
                    model: db.User,
                    attributes: ['name']
                }
            ]
        });

        res.status(200).send(messages);
    } catch (err) {
        console.error(err);
        res.send(err);
    }
}



const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await db.Message.findByPk(id);

        if (!message) {
            res.send('Message not found');
            return;
        }

        await message.destroy();
        res.status(200).send({ message: 'Message deleted' });
    } catch (err) {
        console.error(err);
        res.send(err);
    }
};

module.exports = {
    sendMessage,
    getMessagesForChatRoom,
    deleteMessage
};
