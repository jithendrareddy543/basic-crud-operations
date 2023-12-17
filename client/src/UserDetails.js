// UserDetail.js
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetails = ({ users }) => {
  const [ user, setUser ] = useState({})
  const { userId } = useParams();
  const data = { userId }
  //users.find((user) => user.id === parseInt(userId));
  useEffect(() => {
    // Fetch data from the MongoDB backend
    const fetchData = async () => {
        try {
            const response = await fetch('/api/getUser', {
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
                console.log('User details found successfully');
            } else {
                // Handle error here
                console.error('User not found');
            }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchData();
  }, []);

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Username: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      {/* Additional user details can be displayed here */}
    </div>
  );
};

export default UserDetails;
