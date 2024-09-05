import React from 'react';

function UserItem({ user }) {
    return (
        <div className="user-item">
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default UserItem;
