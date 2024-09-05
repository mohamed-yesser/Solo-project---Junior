
import React from 'react';



function Post({ post }) {
    return (
        <div className="post">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>By: {post.UserId ? post.UserId : 'Unknown'}</small>
        </div>
    );
}

export default Post;
