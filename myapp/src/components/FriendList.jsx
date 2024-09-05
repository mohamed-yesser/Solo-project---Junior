import React from 'react';

const FriendList = ({ friends, onSelectFriend, friendList }) => {
    const styles = {
        container: {
            position: 'fixed',
            right: 0,
            top: 700,
            width: '12%', 
            height: '40%',
            background: 'white',
            borderLeft: '1px solid #ddd',
            overflowY: 'auto',
            boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
        },
        item: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        onlineDot: {
            width: '10px',
            height: '10px',
            backgroundColor: 'green',
            borderRadius: '50%',
        }
    };

    return (
        <div style={styles.container}>
            {friends.map(friend => (
                <div
                    key={friend.id}
                    style={styles.item}
                    onClick={() => onSelectFriend(friend)}
                >
                    <span>{friend.name}</span>
                    {friendList.includes(friend.id) && <span style={styles.onlineDot}></span>}
                </div>
            ))}
        </div>
    );
};

export default FriendList;
