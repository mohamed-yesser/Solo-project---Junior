import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

function App() {
    const [Login, setLogin] = useState(false);

    const handleLogin = () => {
        setLogin(true);
    };

    return (
        <div className="App">
            {Login ? (
                <HomePage />
            ) : (
                <LoginPage handleLogin={handleLogin} />
            )}
        </div>
    );
}

export default App;
