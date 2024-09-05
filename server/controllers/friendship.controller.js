const db = require('../models');
const User = db.User;
const UserFriends = db.UserFriends;

module.exports = {
    addFriend: async (req, res) => {
        try {
            const { userId, friendId } = req.body;
            console.log("sqdnklqdsdsdsdsdsd",userId,friendId);
            
            const user = await User.findByPk(userId);
            const friend = await User.findByPk(friendId);


            if (!user || !friend) {
                return res.status(404).send("User or friend not found" );
            }


            if (userId === friendId) {
                return res.status(404).send("impossible" );
            }

            await UserFriends.create({
                userId: userId,
                friendId: friendId
            });

            await UserFriends.create({
                userId: friendId,
                friendId: userId
            });
            
            res.status(200).send("Friend added successfully" );
        } catch (error) {
            res.status(500).send( error );
        }
    },


    
    getFriends: async (req, res) => {
        try {
            const { userId } = req.params;
            
            const user = await User.findByPk(userId, {
                include: [{
                    model: User,
                    as: 'Followings',
                    through: { attributes: [] },
                    attributes: ['id', 'name', 'email']
                }]
            });

            if (!user) {
                return res.status(404).send("User not found" );
            }

            res.status(200).send(user.Followings);
        } catch (error) {
            res.status(500).send("Error getting friends", error );
        }
    },



    getAllFriendships: async (req, res) => {
        try {
            const friendships = await UserFriends.findAll();

            res.status(200).send(friendships);
        } catch (error) {
            res.status(500).send("Error getting all friendships", error);
        }
    },


    deleteFriend: async (req, res) => {
        try {
            const { userId, friendId } = req.params;
            
            const friendship1 = await UserFriends.findOne({
                where: {
                    userId: userId,
                    friendId: friendId
                }

                
            });

            
            
            const friendship2 = await UserFriends.findOne({
                where: {
                    userId: friendId,
                    friendId: userId
                }

                
            })
            

            if (!friendship1 || !friendship2 ) {
                return res.status(404).send( "Friendship not found" );
            }

            await friendship1.destroy();
            await friendship2.destroy();
            
            res.status(200).send( "Friend removed successfully" );
        } catch (error) {
            res.status(500).send( "Error removing friend", error);
        }
    }
};