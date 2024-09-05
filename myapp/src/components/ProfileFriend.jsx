import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostListGuest from './PostListGuest.jsx';
import ProfileBioGuest from './ProfileBioGuest.jsx'; 

const ProfileFriend = ({ guest }) => {
    const [posts, setPosts] = useState([]);
    const [update, setUpdate] = useState(false);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        if (guest && guest.id) {
            fetchPosts();
        }
    }, [guest, update]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:1128/posts/${guest.id}`);
            if (response) {
                setPosts(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddComment = async (postId) => {
        try {
            const addCom = await axios.post('http://localhost:1128/comment/add', {
                UserId: guest.id,
                PostId: postId,
                content: newComment
            });

            if (addCom) {
                fetchPosts();
            }

            setNewComment("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateComment = async (commentId, updatedContent) => {
        try {
            const response = await axios.put(`http://localhost:1128/comment/${commentId}`, {
                content: updatedContent
            });

            if (response) {
                fetchPosts();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await axios.delete(`http://localhost:1128/comment/${commentId}`);

            if (response) {
                fetchPosts();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event) => {
        setNewComment(event.target.value);
    };

    return (
        <div className="profile">
            <div className="cover">
                <a href="https://example.com/cover-image">
                    <img src="https://fr.fi-group.com/wp-content/uploads/2022/06/FI-Connect-FI-Group-1920x700.jpg" alt="Cover" />
                </a>
            </div>
            <div className="profile-content">
                <ProfileBioGuest guest={guest} /> 

                <div className="profile-posts">
                    {posts.map((post) => (
                        <PostListGuest
                            post={post}
                            key={post.id}
                            handleUpdateComment={handleUpdateComment}
                            handleDeleteComment={handleDeleteComment}
                            handleAddComment={handleAddComment}
                            newComment={newComment}
                            handleInputChange={handleInputChange}
                        />
                    ))}
                    <button onClick={() => console.log(posts)}>Check posts</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileFriend;
