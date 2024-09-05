import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './components/LoginPage.jsx';
import Profile from './components/Profile.jsx';
import MeetingPage from './components/MeetingPage.jsx';
import HomePage from './components/HomePage.jsx';
import ProfileFriend from './components/ProfileFriend.jsx';
import Search from './components/Search.jsx';
import FriendList from './components/FriendList.jsx'; 
import ChatRoom from './components/ChatRoom.jsx'; 

import './index.css';

const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ddd'
};

const homeHeaderStyle = {
    margin: 0,
    cursor: 'pointer',
    color: '#333'
};

const profileHeaderStyle = {
    margin: 0,
    cursor: 'pointer',
    color: '#007bff'
};

function App() {
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState({});
    const [updatePosts, setUpdatePosts] = useState(false);
    const [users, setUsers] = useState([]);
    const [view, setView] = useState('Home');
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState([]);
    const [anotherUser, setAnotherUser] = useState('');
    const [guest, setGuest] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [friendList, setFriendList] = useState([]);
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);

    useEffect(() => {
        if (user && login) {
            fetchUsers();
            fetchPosts();
            fetchFriends();
            userfriendList();
        }
    }, [view, user]);

    const findUserByiD = async (anotherUser) => {
        try {
            const theNewUser = await axios.get(`http://localhost:1128/users/${anotherUser}`);
            if (theNewUser.status === 200) {
                setGuest(theNewUser.data);
                console.log(guest);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const userfriendList = async () => {
        try {
            const response = await axios.get(`http://localhost:1128/friends/${user.id}`);
            if (response && response.data) {
                const friendIds = response.data.map(friend => friend.id);
                setFriendList(friendIds);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchFriends = async () => {
        try {
            const response = await axios.get(`http://localhost:1128/friends/${user.id}`);
            if (response && response.data) {
                setFriends(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUsers = async () => {
        try {
            const getUsers = await axios.get('http://localhost:1128/users');
            setUsers(getUsers.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchPosts = async () => {
        try {
            const getPosts = await axios.get('http://localhost:1128/posts');
            setPosts(getPosts.data);
        } catch (err) {
            console.log(err);
        }
    };

    const refetchUserData = async () => {
        if (user.id) {
            try {
                const response = await axios.get(`http://localhost:1128/users/${user.id}`);
                setUser(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        return user;
    };

    const handleUpdatePosts = () => {
        setUpdatePosts(!updatePosts);
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            setView('Search');
        }
    };

    const handleLogin = () => {
        setLogin(true);
    };

    const handleSelectFriend = async (friend) => {
        try {
            const response = await axios.post('http://localhost:1128/chat', { name: `Chat with ${friend.name}` });
            setSelectedChatRoom(response.data.id);
        } catch (error) {
            console.error('Error creating chatroom:', error);
        }
    };

    const handleCloseChatRoom = () => {
        setSelectedChatRoom(null);
    };

    return (
        <div className="App">
            {login ? (
                <div>
                    {view === 'Search' && (
                        <Search 
                            setView={setView} 
                            query={searchQuery} 
                            loggedUser={user}
                            friendList={friendList}
                        />
                    )}

                    {view === 'Home' && (
                        <div style={containerStyle}>
                            <h1 style={homeHeaderStyle}>Home</h1>
                            <input
                                style={{
                                    width: '16%',
                                    padding: '8px 12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '16px',
                                    boxSizing: 'border-box',
                                    marginBottom: '10px',
                                    marginLeft: '1080px'
                                }}
                                type="text"
                                placeholder="Search for users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                className="search-bar"
                            />
                            <h1 
                                onClick={() => setView('Profile')}
                                style={profileHeaderStyle}
                            >
                                Profile
                            </h1>
                        </div>
                    )}

                    {view === 'Home' && (
                        <HomePage 
                            posts={posts} 
                            friends={friends} 
                            setView={setView} 
                            setAnotherUser={setAnotherUser} 
                            findUserByiD={findUserByiD} 
                            user={user}
                            fetchPosts={fetchPosts}
                        />
                    )}

                    {view === 'Profile' && !anotherUser && (
                        <div>
                            <h1 onClick={() => { setView('Home'); }}>Home</h1>
                            <Profile 
                                user={user} 
                                updatePosts={updatePosts} 
                                setView={setView}
                            />
                        </div>
                    )}

                    {view === 'Profile' && anotherUser && (
                        <div>
                            <h1 onClick={() => { setView('Home'); setAnotherUser(null) }}>Home</h1>
                            <ProfileFriend  
                                guest={guest} 
                                updatePosts={updatePosts} 
                                setView={setView}
                            />
                        </div>
                    )}

                    {view === 'Meeting' && (
                        <div>
                            <h1>Meeting</h1>
                            <MeetingPage users={users} setView={setView} />
                        </div>
                    )}

                
                    <FriendList
                        friends={friends}
                        onSelectFriend={handleSelectFriend}
                        friendList={friendList}
                    />

                   
                    {selectedChatRoom && (
                        <ChatRoom 
                            chatRoomId={selectedChatRoom} 
                            onClose={handleCloseChatRoom} 
                        />
                    )}
                </div>
            ) : (
                <LoginPage 
                    handleLogin={handleLogin} 
                    login={login} 
                    setLogin={setLogin} 
                    user={user} 
                    setUser={setUser}
                />
            )}
            {console.log(friendList, 'frlist')}
        </div>
    );
}

export default App;
