import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchDetails from './SearchDetails';

const Search = ({ loggedUser, query, setView, friendList }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetchUsers();
    }, [query]);



    

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:1128/users/search/${query}`);
            if (response) {
                setUsers(response.data);
            }
        } catch (err) {
            console.log('Error fetching users:', err);
        }
    };

    const isFriend = (id) => {
        return friendList.includes(id);
    };

    return (
        <div>
          
            <div style={{ 
                padding: '10px 20px', 
                backgroundColor: 'blue', 
                color: '#fff', 
                display: 'flex', 
                justifyContent: 'colomuns', 
                alignItems: 'center'
            }}>
                <h1 style={{ cursor: 'pointer' }} onClick={() => setView('Home')}>Home</h1>
            </div>



         
            <div style={{ 
                padding: '20px', 
                maxWidth: '800px', 
                margin: '20px auto', 
                backgroundColor: '#fff', 
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}>
                <h2>Search Results for "{query}"</h2>
                <div style={{ marginTop: '20px' }}>





                    {users.length > 0 ? (
                        users.map((user) => (
                            <div key={user.id} style={{ 
                                border: '1px solid #ddd', 
                                borderRadius: '4px', 
                                padding: '10px', 
                                marginBottom: '10px',
                                boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
                            }}>
                                <SearchDetails 
                                    user={user} 
                                    loggedUser={loggedUser}
                                    isFriend={isFriend}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
