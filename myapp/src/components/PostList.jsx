import React from 'react';
import axios from 'axios';

const PostList = ({ post , handleDelete  , invert}) => {


    return (
        <div className="post">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => {handleDelete(post.id); invert()} }>Delete</button>
        </div>
    );
};

export default PostList;
