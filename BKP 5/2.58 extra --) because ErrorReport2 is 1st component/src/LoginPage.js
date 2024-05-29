import React, { useState } from 'react';

// Fake database
const database = {
    George: '1234',
    Andrew: '5678'
};

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = () => {
        if (database[username] === password) {
            setIsLoggedIn(true);
            setMessage('Logged in successfully!');
        } else {
            setMessage('Invalid username or password');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setMessage('Logged out successfully!');
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
           
                </div>
            ) : (
                <div>
                    <div>
                        <label>
                            Username:
                                <input type="text" value={username} onChange={e =>
                                    setUsername(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                                <input type="password" value={password} onChange={e =>
                                    setPassword(e.target.value)} />
                        </label>
                    </div>
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
