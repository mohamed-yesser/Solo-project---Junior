import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatRoom = ({ chatRoomId, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:1128/chat/${chatRoomId}/messages`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [chatRoomId]);

    const handleSendMessage = async () => {
        try {
            await axios.post(`http://localhost:1128/chat/${chatRoomId}/messages`, { content: message });
            setMessage('');
            const response = await axios.get(`http://localhost:1128/chat/${chatRoomId}/messages`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <span>Chat Room</span>
                <button style={styles.closeButton} onClick={onClose}>X</button>
            </div>
            <div style={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    <div key={index} style={styles.message}>
                        <span>{msg.sender}: </span>
                        <span>{msg.content}</span>
                    </div>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    style={styles.input}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button style={styles.sendButton} onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'fixed',
        right: '0',
        top: '0',
        width: '25%',
        height: '100%',
        backgroundColor: '#f5f5f5',
        borderLeft: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        borderBottom: '1px solid #ddd',
        alignItems: 'center',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '20px',
        cursor: 'pointer',
    },
    messagesContainer: {
        flex: 1,
        padding: '10px',
        overflowY: 'auto',
    },
    message: {
        marginBottom: '10px',
    },
    inputContainer: {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid #ddd',
    },
    input: {
        flex: 1,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    sendButton: {
        marginLeft: '10px',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default ChatRoom;
