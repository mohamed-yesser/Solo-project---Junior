module.exports = (connection, DataTypes) => {
    const Media = connection.define('Media', {
        
        link: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Media;
};
