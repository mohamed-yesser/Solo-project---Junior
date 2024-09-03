module.exports = (connection, DataTypes) => {
    const Post = connection.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return Post;
};
