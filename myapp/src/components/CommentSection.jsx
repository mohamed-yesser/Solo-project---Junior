import React, { useState } from 'react';





const CommentSection = ({ comments, handleAddComment, newComment, handleInputChange, handleDeleteComment, handleUpdateComment }) => {


    const [editCommentId, setEditCommentId] = useState(null);
    const [editContent, setEditContent] = useState("");




    const handleEditChange = (event) => {
        setEditContent(event.target.value);
    };

    const startEditing = (commentId, content) => {
        setEditCommentId(commentId);
        setEditContent(content);
    };

    const saveEdit = (commentId) => {
        handleUpdateComment(commentId, editContent);
        setEditCommentId(null);
        setEditContent("");
    };



    
    const safeComments = Array.isArray(comments) ? comments : [];

    return (
        <div>
            {safeComments.map(comment => (
                <div key={comment.id} style={styles.commentItem}>
                    {editCommentId === comment.id ? (
                        <div>
                            <input
                                type="text"
                                value={editContent}
                                onChange={handleEditChange}
                                placeholder="Edit your comment"
                            />
                            <button onClick={() => saveEdit(comment.id)}>Save</button>
                            <button onClick={() => setEditCommentId(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p>{comment.content}</p>
                            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            <button onClick={() => startEditing(comment.id, comment.content)}>Edit</button>
                        </div>
                    )}
                </div>
            ))}
            <input
                type="text"
                value={newComment}
                onChange={handleInputChange}
                placeholder="Add a comment"
            />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    );
};

const styles = {
    commentItem: {
        backgroundColor: '#fff',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }
};

export default CommentSection;
