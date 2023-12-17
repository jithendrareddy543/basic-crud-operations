import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import './Dashboard.css';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(''); // 'Male', 'Female', 'Others'
  const [hearAbout, setHearAbout] = useState([]); // Array of selected options
  const [city, setCity] = useState(''); // Selected city from dropdown
  const [state, setState] = useState(''); // Text input for state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  
  const [isSignup, setIsSignup] = useState(); // Toggle between signup and login forms
  const [isLogin, setIsLogin] = useState();
  const [userDetails, setUserDetails] = useState([]);

  const history = useHistory();
  useEffect(() => {
    // This will run whenever isSignup or isLogin changes
    console.log('isSignup or isLogin changed:', isSignup, isLogin);
    
  }, [isSignup, isLogin]);


  const handleAddUser = () => {
    history.push('/add-user');
  };

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
            console.log(isSignup)
        } else {
            // Handle error here
            console.error('Signup failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

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

        if (response.ok) {
            const responseData = await response.json();
            setUserDetails([responseData.user]);
            setIsLogin(true);
            console.log('User logged in successfully');
            console.log(responseData.user);
        } else {
            // Handle error here
            console.error('Login failed/Invalid credentials');
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container">
    <div className="signup-form">
        {isSignup ? (<>
            
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
        </>) : !isLogin ? <>
        (<>
            
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
              Don't have an account?{' '}
              <span onClick={() => setIsSignup(true)}>Sign up here</span>
            </p>
        </>)
        </> : <>
        <div className="dashboard-container">
        <h2>User Listing</h2>
        {userDetails.length === 0 ? (
            <div className="no-data-found">
            <img src="/path/to/placeholder-image.png" alt="No Data Found" />
            <p>No Data Found</p>
            </div>
        ) : (
            <div className="user-list">
            {userDetails.map((user) => (
                <div key={user.id} className="user-card">
                <p>Username: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                </div>
            ))}
            </div>
        )}
        <button onClick={handleAddUser}>Add User</button>
    </div></>}
    </div>
    </div>
  );
};

export default SignupScreen;
