// EditUser.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Update import
import axios from 'axios';

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [user, setUser] = useState({});
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = { userId }
        const response = await fetch('/api/editFetchData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const fetchedData = await response.json();
            console.log(fetchedData.user)
            setUser(fetchedData.user)
            setName(fetchedData.user.name)
            setPhone(fetchedData.user.phone)
            setEmail(fetchedData.user.email)
            console.log('User details found successfully');
        } else {
            // Handle error here
            console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSave = async () => {
    try {
        const data = { userId, name, email, phone }
        const response = await fetch('/api/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const fetchedData = await response.json();
            alert('User updated successfully');
            navigate('/dashboard'); // Use navigate instead of history.push
            console.log('User details updated successfully', fetchedData.user);
        } else {
            // Handle error here
            console.error('User not found');
        }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Implement input change handlers to update the user state

  return (
    <div className="signup-container">
    <div className="signup-form">
      <h2>Edit User</h2>
      <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} pattern="[A-Za-z ]+" required />
        </div>
        <div className="form-group">
            <label htmlFor="name">Phone:</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} pattern="[0-9]+" required />
        </div>
        <div className="form-group">
            <label htmlFor="name">Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} pattern="[A-Za-z0-9@.]+" required />
        </div>
      <button onClick={handleSave}>Save</button>
    </div>
    </div>
  );
};

export default EditUser;
