import React, { useState } from 'react';
import axios from 'axios';
const CreatePost = ({ handleCreatePost, user , invert}) => {




    const [newPost, setNewPost] = useState({ title: '', body: '', UserId: user.id });
    const [image , setImage] = useState('')
    const [url , setUrl] = useState('')


    

const uploadImage = async ()=>{
try {
    
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "bk5jum3d")
    data.append("cloud_name","dr07atq6z")
    const response = await axios.post("  https://api.cloudinary.com/v1_1/dr07atq6z/image/upload",data)
    console.log("response photo cloudinary" , response);
    
    setUrl(response.data.url)
} catch (error) {
    throw error
}
 

}

    const handlePostChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setNewPost(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitPost = (e) => {
        e.preventDefault();
        newPost.image=url
        handleCreatePost(newPost);
        setNewPost({ title: '', body: '', UserId: user.id });
        invert()
    };

    return (
        <form onSubmit={handleSubmitPost} className="new-post-form">
            <input
                type="text"
                name="title"
                placeholder="Post title"
                value={newPost.title}
                onChange={handlePostChange}
                required
            />
            <textarea
                name="body"
                placeholder="What's on your mind?"
                value={newPost.body}
                onChange={handlePostChange}
                required
            />
            <div>
<div>
<input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
<button onClick={uploadImage}>Upload</button>
</div>
<div>
<h1>Uploaded image will be displayed here</h1>
<img src={url}/>
</div>
</div>
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;
