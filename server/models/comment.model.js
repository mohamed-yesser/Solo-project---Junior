module.exports = (connection, DataTypes) => {


    
    const Comment = connection.define('Comment', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return Comment;
};
