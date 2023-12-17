// AddUser.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    const data = { username, email, mobile }
    try {
        if (username && mobile && email) {
            const response = await fetch('/api/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                console.log('User added successfully');
                navigate('/dashboard');
                setUsername('')
                setMobile('')
                setEmail('')
            } else {
                // Handle error here
                console.error('Failed to add');
            }
          } else {
            alert('Please enter valid data for all fields.');
        }
        
    } catch (error) {
        console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    // Navigate to the dashboard or any other page without saving
    navigate('/dashboard');
    setUsername('')
    setMobile('')
    setEmail('')
  };

  return (
    <div className="signup-container">
    <div className="signup-form">
      <h2>Add User</h2>
      
      <label>User Name:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <div />

        <label>Mobile:</label>
        <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        <div />

        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div />

        <button type="button" onClick={handleSave}>
          Save
        </button>

        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
    </div>
    </div>
  );
};

export default AddUser;