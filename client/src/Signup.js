import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import './Dashboard.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(''); // 'Male', 'Female', 'Others'
  const [hearAbout, setHearAbout] = useState([]); // Array of selected options
  const [city, setCity] = useState(''); // Selected city from dropdown
  const [state, setState] = useState(''); // Text input for state

  
  const [isSignup, setIsSignup] = useState(); // Toggle between signup and login forms

  useEffect(() => {
    // This will run whenever isSignup or isLogin changes
    console.log('isSignup or isLogin changed:', isSignup);
    
  }, [isSignup]);

  const handleSignup = async () => {
    console.log('Saving signup data:', { name, email, phone }); // Add other data as needed
    // Add your signup API call logic here
    const data = { name, password, email, phone, gender, hearAbout, city, state };

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            setIsSignup(true)
            console.log('User signup successfully');
        } else {
            // Handle error here
            console.error('Signup failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container">
    <div className="signup-form">
    <>
            
            <h2>Signup</h2>
            <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} pattern="[A-Za-z ]+" required />
            </div>

            <div className="form-group">
            <label htmlFor="name">Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} pattern="[A-Za-z0-9]+" required />
            </div>

            <div className="form-group">
            <label htmlFor="name">Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} pattern="[A-Za-z0-9@.]+" required />
            </div>

            <div className="form-group">
            <label htmlFor="name">Phone:</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} pattern="[0-9]+" required />
            </div>

            <div className="form-group">
            <label htmlFor="name">Gender:</label>
                <label>
                <input type="radio" value="Male" checked={gender === 'Male'} onChange={() => setGender('Male')} /> Male
                </label>
                <label>
                <input type="radio" value="Female" checked={gender === 'Female'} onChange={() => setGender('Female')} /> Female
                </label>
                <label>
                <input type="radio" value="Others" checked={gender === 'Others'} onChange={() => setGender('Others')} /> Others
                </label>
            </div>

            <div className="form-group">
            <label htmlFor="name">How did you hear about this?</label>
                <label>
                <input type="checkbox" value="LinkedIn" checked={hearAbout.includes('LinkedIn')} onChange={() => setHearAbout([...hearAbout, 'LinkedIn'])} /> LinkedIn
                </label>
                <label>
                <input type="checkbox" value="Friends" checked={hearAbout.includes('Friends')} onChange={() => setHearAbout([...hearAbout, 'Friends'])} /> Friends
                </label>
                <label>
                <input type="checkbox" value="JobPortal" checked={hearAbout.includes('JobPortal')} onChange={() => setHearAbout([...hearAbout, 'JobPortal'])} /> Job Portal
                </label>
                <label>
                <input type="checkbox" value="Others" checked={hearAbout.includes('Others')} onChange={() => setHearAbout([...hearAbout, 'Others'])} /> Others
                </label>
            </div>

            <div className="form-group">
            <label htmlFor="name">City:</label>
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">Select City</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
                </select>
            </div>

            <div className="form-group">
            <label htmlFor="name">State:</label>
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter State" />
            </div>

            <div className="form-group">
            <button onClick={handleSignup}>Save</button>
            </div>
            <p>
                Already have account? <Link to="/login">Login</Link>
            </p>
        </>
    </div>
    </div>
  );
};

export default Signup;
