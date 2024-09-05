import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ handleLogin, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await axios.post('http://localhost:1128/users/login', { email, password });
            if (loginResponse.status === 200) {
                const userResponse = await axios.get(`http://localhost:1128/users/get/${email}`);
                if (userResponse.data) {
                    setUser(userResponse.data);
                    handleLogin();
                }
            }
        } catch (error) {
            setMessage('Wrong email or password');
        }
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f4',
            padding: '20px',
        },
        form: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '300px',
            textAlign: 'center',
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
        },
        button: {
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '10px',
        },
        signUpButton: {
            backgroundColor: '#28a745',
        },
        message: {
            color: 'red',
            marginTop: '10px',
        },
        heading: {
            fontSize: '24px',
            marginBottom: '20px',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.form}>
                <h1 style={styles.heading}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Login</button>
                    <button type="button" style={{ ...styles.button, ...styles.signUpButton }}>Sign Up</button>
                </form>
                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
