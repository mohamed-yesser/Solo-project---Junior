const { Sequelize, DataTypes } = require('sequelize')

const connection = new Sequelize('connect', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql', 
});


const db = {};


db.User = require('./user.model')(connection, DataTypes);
db.Post = require('./post.model')(connection, DataTypes);
db.Comment = require('./comment.model')(connection, DataTypes);
db.Media = require('./media.model')(connection, DataTypes);


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

db.connection = connection;


connection.authenticate()
    .then(() => {
        console.log('Connected To Database.');
    })
    .catch(err => {
        console.log(err)
    });




// connection.sync({ alter: true })



module.exports = db;
