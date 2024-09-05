import React from 'react';
import UserItem from './UserItem.jsx';

function MeetingPage({ users }) {
    return (
        <div className="meeting-page">
            <h2>All Users</h2>
            <div className="user-list">
                {users.map(user => (
                    <UserItem key={user.id} user={user} /> 
                ))}
            </div>
        </div>
    );
}

export default MeetingPage;
