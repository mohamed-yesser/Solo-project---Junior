import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import PostList from './PostList.jsx';
import CreatePost from './CreatePost.jsx';
import ProfileBio from './ProfileBio.jsx'; 

const Profile = ({ user}) => {
    const [posts, setPosts] = useState([]);
    const[update , setUpdate] = useState(false)

    

    useEffect(() => {
        fetchPosts();
        
    }, [update]); 



    const invert = ()=>{


        setUpdate(!update)
    }
    
    const handleDelete = async (postId) => {
        try {
            const del = await axios.delete(`http://localhost:1128/posts/${postId}`);
            if (del) {
                fetchPosts()
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };




    const handleCreatePost = (postData) => {
        console.log("postData",postData);
        
        axios.post('http://localhost:1128/posts/add', postData)
            .then(() => {
                fetchPosts();
            })
            .catch(err => console.log(err));
    };


    const fetchPosts = async () => {

        try {
            const response = await axios.get(`http://localhost:1128/posts/${user.id}`);
            if(response){

                setPosts(response.data);
            }
           
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="profile">
            <div className="cover">
                <a href="https://example.com/cover-image">
                    <img src="https://fr.fi-group.com/wp-content/uploads/2022/06/FI-Connect-FI-Group-1920x700.jpg" alt="Cover" />
                </a>
            </div>
            <div className="profile-content">
                <ProfileBio user={user} /> 

                <div className="profile-posts">
                    <CreatePost 
                        handleCreatePost={handleCreatePost} 
                        user={user} 
                        
                        invert={invert}
                    />

                <div>


                        {posts.map((post) => (
                            <PostList post={post} key={post.id}  handleDelete={handleDelete} invert={invert} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
