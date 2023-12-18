// App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
  Link,
} from 'react-router-dom';
import WelcomeText from './Welcome';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import AddUser from './AddUser';
import UserDetails from './UserDetails';
import EditUser from './EditUSer';

const App = () => {
  const user = {
    username: 'Jithendra Reddy', // Replace with the actual username or get it dynamically
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeText username={user.username}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/user-details/:userId" element={<UserDetails />} />
        <Route path="/add-user" element={<AddUser /> } />
        <Route path="/edit/:userId" element={<EditUser />} />
        {/* Add additional routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
