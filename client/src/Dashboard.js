// Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    // Fetch data from the MongoDB backend
    const fetchData = async () => {
      try {
        const savedSearchTerm = localStorage.getItem('dashboardFilter');
        if (savedSearchTerm) {
          setSearchTerm(savedSearchTerm);
        }
        const response = await axios.get('/api/getAllUsers'); // Replace with your actual API endpoint
        setUsers(response.data.user); // Assuming the response is an array of users
        console.log(response.data.user)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    //fetchData(); // for normal fetching
  }, [users]); // The empty dependency array ensures that useEffect runs only once, similar to componentDidMount

  const fetchSortUsers = async () => {
    try {
      const data = { sortCriteria }
      const response = await fetch('/api/sorting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const fetchedData = await response.json();
        console.log(fetchedData)
        setUsers(fetchedData.user)
      } else {
        // Handle error here
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchSearchUsers = async () => {
    try {
      const data = { searchTerm }
      localStorage.setItem('dashboardFilter', searchTerm);
      const response = await fetch('/api/searching', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const fetchedData = await response.json();
        console.log(fetchedData)
        setUsers(fetchedData.user)
      } else {
        // Handle error here
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const data = {userToDelete}
      // Send a DELETE request to delete the user
      const response = await fetch('/api/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setShowConfirmation(false);
      } else {
        // Handle error here
        console.error('User not found');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCancelDelete = () => {
    // Close the confirmation dialog without deleting the user
    setShowConfirmation(false);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    fetchSortUsers();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    fetchSearchUsers();
  };

  return (
    
    <div className="signup-container">
    <div className="signup-form">
      <h2>User Dashboard</h2>
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search by Name, Mobile, or Email" />
      <div />
      <div>
        <button onClick={() => handleSortChange('asc')}>A-Z</button>
        <button onClick={() => handleSortChange('lastModified')}>Last Modified</button>
        <div />
        <button onClick={() => handleSortChange('desc')}>Z-A</button>
        <button onClick={() => handleSortChange('lastInserted')}>Last Inserted</button>
      </div>
      
      {users.length === 0 ? (
        <div>
          {/* <img src="placeholder-image.jpg" alt="No Data Found" /> */}
          <p>No users found.</p>
        </div>
      ) : (
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <p>Username: {user.name}</p>
              {/* Add View Details link to navigate to a user details page  */}
              <Link to={`/user-details/${user._id}`}>View Details</Link> 
              <div />
              <Link to={`/edit/${user._id}`}>Edit</Link>
              <div />
              <button onClick={() => handleDeleteClick(user)}>Delete</button>
              {showConfirmation && (
              <div>
                <p>Are you sure you want to delete {userToDelete && userToDelete.username}?</p>
                <button onClick={handleConfirmDelete}>Yes</button>
                <button onClick={handleCancelDelete}>No</button>
              </div>
              )}
            </div>
          ))}
        </div>
      )}
      <Link to={'/add-user'}>Add User</Link>
      {/* <AddUser onAddUser={addUser} /> */}
    </div>
    </div>
  );
};

export default Dashboard;