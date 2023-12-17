// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const Login = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        //console.log('Logging in with:', { loginEmail, loginPassword }); // Add other data as needed
        // Add your login API call logic here
        try {
            const data = { loginEmail, loginPassword }
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            // For simplicity, checking if both fields are non-empty.
            if (response.ok) {
            // Navigate to the dashboard upon successful login.
                navigate('/dashboard');
            } else {
                alert('Please enter valid email and password.');
            }
            // if (response.ok) {
            //     const responseData = await response.json();
            //     setUserDetails([responseData.user]);
            //     setIsLogin(true);
            //     console.log('User logged in successfully');
            //     console.log(responseData.user);
            // } else {
            //     // Handle error here
            //     console.error('Login failed/Invalid credentials');
            // }
        } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    
    <div className="signup-container">
    <div className="signup-form">
      <h2>Login</h2>
      <div className="form-group">
              <label htmlFor="loginEmail">Email:</label>
              <input
                type="email"
                id="loginEmail"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Password:</label>
              <input
                type="password"
                id="loginPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
      <p>
        Do you want to see user details? <Link to="/dashboard">Dashboard</Link>
      </p>
    </div>
    </div>
  );
};

export default Login;