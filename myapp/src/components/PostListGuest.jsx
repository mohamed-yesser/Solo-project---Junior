import React, { useState } from 'react';
import CommentSection from './CommentSection';

const PostListGuest = ({ post, handleUpdateComment, handleDeleteComment, handleAddComment, newComment, handleInputChange }) => {
    const [showComments, setShowComments] = useState(false);

    return (
        <div className="post">
            <h3>{post.title}</h3>
            <p style={{ fontSize: '25px' }}>{post.body}</p> 

            <button onClick={() => setShowComments(!showComments)}>
                {showComments ? 'Hide Comments' : 'Show Comments'} ({post.Comments.length})
            </button>

            {showComments && (
                <CommentSection
                    comments={post.Comments}
                    handleAddComment={() => handleAddComment(post.id)}
                    newComment={newComment}
                    handleInputChange={handleInputChange}
                    handleDeleteComment={handleDeleteComment}
                    handleUpdateComment={handleUpdateComment}
                />
            )}
        </div>
    );
};

export default PostListGuest;
