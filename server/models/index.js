const { Sequelize, DataTypes } = require('sequelize');

const connection = new Sequelize('connect', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging:false
});

const db = {};


db.User = require('./user.model')(connection, DataTypes);
db.Post = require('./post.model')(connection, DataTypes);
db.Comment = require('./comment.model')(connection, DataTypes);
db.Media = require('./media.model')(connection, DataTypes);
db.UserFriends = require('./friends.model')(connection, DataTypes);
db.ChatRoom = require('./chatRoom.model')(connection, DataTypes);
db.Message = require('./message.model')(connection, DataTypes);
db.ChatRoomUsers = require('./chatRoomUsers.model')(connection, DataTypes);


db.User.hasMany(db.Post);
db.User.hasMany(db.Comment);
db.User.hasMany(db.Media);


db.Post.hasMany(db.Comment);
db.Post.hasMany(db.Media);
db.Post.belongsTo(db.User)

db.Comment.belongsTo(db.User);
db.Comment.belongsTo(db.Post);

db.Media.belongsTo(db.User);
db.Media.belongsTo(db.Post);





db.User.belongsToMany(db.ChatRoom, { through: db.ChatRoomUsers, as: 'ChatRooms', foreignKey: 'userId' });




db.User.belongsToMany(db.User, { through: db.UserFriends, as: "Followings", foreignKey: 'userId' });
db.User.belongsToMany(db.User, { through: db.UserFriends, as: 'Followers', foreignKey: 'friendId' });






db.ChatRoom.belongsToMany(db.User, { through: db.ChatRoomUsers, as: 'Participants', foreignKey: 'chatRoomId' });

db.ChatRoom.hasMany(db.Message);

db.Message.belongsTo(db.ChatRoom);
db.Message.belongsTo(db.User);

db.connection = connection;

connection.authenticate()
    .then(() => {
        console.log('Connected To Database.');
    })
    .catch(err => {
        console.log('Connection Error:', err);
    });


// connection.sync({ alter: true })

module.exports = db;
