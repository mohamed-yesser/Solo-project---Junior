
module.exports = (connection, DataTypes) => {
    const User = connection.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true  
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return User;
};
