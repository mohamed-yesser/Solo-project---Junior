import React, { useState, useEffect } from 'react';
import CommentSection from '../components/CommentSection';
import axios from 'axios';

function HomePage({ user, posts, friends, setAnotherUser, setView, findUserByiD, fetchPosts }) {
    const [show, setShow] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [currentPostId, setCurrentPostId] = useState(null);
    const [postUp, setPostUp] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, [postUp]);

    const friendIds = friends.map(friend => friend.id);
    const filteredPosts = posts.filter(post => friendIds.includes(post.UserId));

    const styles = {
        container: {
            display: 'flex',
            height: '100vh',
            overflow: 'hidden'
        },
        postsContainer: {
            flex: '0 0 70%',
            padding: '20px',
            backgroundColor: '#f4f4f4',
            fontFamily: 'Arial, sans-serif',
            overflowY: 'auto'
        },
        sidebar: {
            flex: '0 0 30%',
            padding: '20px',
            backgroundColor: '#e0e0e0',
            borderLeft: '1px solid #ccc',
            overflowY: 'auto'
        },
        postItem: {
            backgroundColor: '#fff',
            padding: '15px',
            marginBottom: '10px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        },
        postTitle: {
            fontSize: '1.5em',
            marginBottom: '10px',
            color: '#333'
        },
        postBody: {
            fontSize: '2.5em',
            marginBottom: '10px',
            color: '#555',
            height: '75px',
            textAlign: 'center'
        },
        postAuthor: {
            fontSize: '0.9em',
            color: '#888'
        },
        commentsBox: {
            border: '1px solid #aaa',
            padding: '15px',
            marginTop: '10px',
            borderRadius: '10px',
            backgroundColor: '#f0f0f0'
        },
        inputStyle: {
            marginBottom: '10px',
            padding: '8px',
            width: '100%',
            boxSizing: 'border-box'
        },
        buttonStyle: {
            padding: '8px 16px',
            marginBottom: '20px',
            width: '100%'
        }
    };

    const handleInputChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleUpdateComment = async (commentId, updatedContent) => {
        try {
            const response = await axios.put(`http://localhost:1128/comment/${commentId}`, {
                content: updatedContent
            });

            if (response) {
                setPostUp(!postUp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await axios.delete(`http://localhost:1128/comment/${commentId}`);

            if (response) {
                setPostUp(!postUp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddComment = async (postId) => {
        try {
            const addCom = await axios.post('http://localhost:1128/comment/add', {
                UserId: user.id,
                PostId: postId,
                content: newComment
            });

            if (addCom) {
                setPostUp(!postUp);
            }

            setNewComment("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.postsContainer}>
                <h2>Posts from Friends</h2>
                <div className="posts">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <div key={post.id}>
                                <div style={styles.postItem}>
                                    <p style={styles.postAuthor}
                                        onClick={() => {
                                            setAnotherUser(post.User.id);
                                            findUserByiD(post.User.id);
                                            setView('Profile');
                                        }}>
                                        <h1>Posted by: {post.User.name}</h1> 
                                    </p>

                                    <h3 style={styles.postTitle}>{post.title}</h3>
                                    <p style={styles.postBody}>{post.body}</p>
                                    <h4 style={{
                                        cursor: 'pointer',
                                        padding: '8px 12px',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        backgroundColor: '#f9f9f9',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        display: 'inline-block',
                                        fontSize: '16px',
                                        color: '#333',
                                    }}
                                        onClick={() => {
                                            setShow(!show);
                                            setCurrentPostId(post.id);
                                        }}>
                                        Comments {post.Comments.length}
                                    </h4>
                                </div>

                                {show && currentPostId === post.id && (
                                    <div style={styles.commentsBox}>
                                        <CommentSection
                                            comments={post.Comments || []} 
                                            handleAddComment={() => handleAddComment(post.id)}
                                            newComment={newComment}
                                            handleInputChange={handleInputChange}
                                            handleDeleteComment={handleDeleteComment}
                                            handleUpdateComment={handleUpdateComment}
                                        />
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No posts found.</p>
                    )}
                </div>
                <button onClick={() => console.log(posts)}>Check posts</button>
            </div>

            <div style={styles.sidebar}>
                <h3>Chat</h3>
                <p>Friends.</p>
            </div>
        </div>
    );
}

export default HomePage;
