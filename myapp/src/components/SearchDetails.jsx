
import React from 'react';
import axios from 'axios';




const SearchDetails = ({ loggedUser, user, isFriend }) => {
    console.log("Current User ID:", user.id);
    console.log("Is Friend:", isFriend(user.id));

    const handleAddFriend = async () => {
        try {
            await axios.post('http://localhost:1128/friends/add', {
                userId: loggedUser.id, 
                friendId: user.id
            });
        } catch (err) {
            console.error('Error adding friend:', err);
        }
    };

    const handleDeleteFriend = async () => {
        try {
            await axios.delete(`http://localhost:1128/friends/${loggedUser.id}/${user.id}`);
        } catch (err) {
            console.error('Error deleting friend:', err);
        }
    };

    return (
        <div className="search-details">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            {isFriend(user.id) ? (
                <button onClick={handleDeleteFriend}>Delete Friend</button>
            ) : (
                <button onClick={handleAddFriend}>Add Friend</button>
            )}
        </div>
    );
};
export default SearchDetails