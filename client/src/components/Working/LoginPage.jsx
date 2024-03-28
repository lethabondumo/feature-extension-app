import React, { useState } from 'react';

function LoginPage({ setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add login logic here (e.g., API call to authenticate user)
    // Upon successful login, update currentUser state using setCurrentUser
    // Example:
    if (username === 'admin' && password === 'adminpassword') {
      setCurrentUser({ username: 'admin', isAdmin: true });
    } else if (username === 'user' && password === 'userpassword') {
      setCurrentUser({ username: 'user', isAdmin: false });
    } else {
      // Handle incorrect credentials
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
