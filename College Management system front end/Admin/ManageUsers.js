import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminPage from './AdminPage';
import './UserRoles.css';
import axios from 'axios';

function ManageUsers() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [isUpdateEnabled, setIsUpdateEnabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSearch = () => {
    fetch(`http://127.0.0.1:8000/api/admin/user/profile/?user_id=${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('User not found');
        }
      })
      .then((data) => {
        // Update userData with the response
        setUserData(data);
        // Reset the update button state when new data is fetched
        setIsUpdateEnabled(false);
        setError(null);
        

      })
      .catch((error) => {
        setError(error.message); // Handle the error here
        setUserData(null);
      });
  };



  const handleUpdate = () => {
    // Make a POST API call to update the user data
    // Replace 'YOUR_UPDATE_API_ENDPOINT' with the actual endpoint
    var input={
      "Username" : userData.data.Username,
      "Email" : userData.data.Email,
      "FirstName" : userData.data.FirstName,
      "LastName" : userData.data.LastName,
      "Address" : userData.data.Address,
      "Phone_number" : userData.data.Phone_number,
      "user_id" : userData.data.User_ID
  };
  console.log(typeof input);
  console.log(JSON.stringify(input));
    fetch(`http://127.0.0.1:8000/api/admin/update/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify(input), // Update with the actual payload structure
    })
      .then((response) => response.json())
      .then((updatedData) => {
        console.log('User data updated successfully:', updatedData);
        // Clear input fields after successful update
        setUserData(null);
        setUserId('');
      })
      .catch((error) => console.error('Error updating user data:', error))
      .finally(() => {
        // Reset the update button state after update attempt
        setIsUpdateEnabled(false);
      });
  };

  const handleDelete = () => {
    // Make a DELETE API call to delete the user
    // Replace 'YOUR_DELETE_API_ENDPOINT' with the actual endpoint
    fetch(`http://127.0.0.1:8000/api/admin/delete/profile?user_id=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
      .then(() => {
        console.log('User deleted successfully');
        // Clear input fields after successful delete
        setUserData(null);
        setUserId('');
      })
      .catch((error) => console.error('Error deleting user:', error))
      .finally(() => {
        // Reset the update button state after delete attempt
        setIsUpdateEnabled(false);
      });
  };

  const handleInputChange = (field, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        [field]: value,
      },
    }));
    setIsUpdateEnabled(true);
  };
  return (
    <div>
      <AdminPage />
      <h1>Manage Users</h1>

      <div className="User-Role">
        <input
          style={{ width: '25%', marginRight: '10px' }}
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={handleUserIdChange}
        />
        <input type="button" onClick={handleSearch} value="Search" />
        

        {/* Display user details */}
        {userData && (
          <div>
            {/* Populate text fields with user details */}
            <label>User ID:</label>
            <input
              style={{width:"50%"}}
              type="text"
              value={userData.data.User_ID}
              onChange={(e) => handleInputChange('User_ID', e.target.value)}
              disabled
            />

            <label>Username:</label>
            <input
              style={{width:"50%"}}
              type="text"
              value={userData.data.Username}
              onChange={(e) => handleInputChange('Username', e.target.value)}
            />
{/* 
            <label>Password:</label>
            <input
              style={{width:"50%"}}
              type="text"
              value={userData.data.Password}
              onChange={(e) => handleInputChange('Password', e.target.value)}
            /> */}

            <label>Email:</label>
            <input
              style={{width:"50%"}}
              type="text"
              value={userData.data.Email}
              onChange={(e) => handleInputChange('Email', e.target.value)}
            />       
            
            {/* <label>User Role:</label>
            <input
              style={{width:"50%"}}
              type="text"
              value={userData.data.User_role}
              onChange={(e) => handleInputChange('User_role', e.target.value)}
            />                  */}

            <label>First Name:</label>
            <input
              style={{width:"50%"}}
              type="text"
              value={userData.data.FirstName}
              onChange={(e) => handleInputChange('FirstName', e.target.value)}
            />

            <label>Last Name:</label>
            <input
              style={{width:"50%"}}
              type="text"
              value={userData.data.LastName}
              onChange={(e) => handleInputChange('LastName', e.target.value)}
            />

            <label>Address:</label>
            <input
              style={{width:"50%"}}
              type="text"
              value={userData.data.Address}
              onChange={(e) => handleInputChange('Address', e.target.value)}
            />            

            <label>Phone Number:</label>
            <input
              style={{width:"50%"}}
              type="text"
              value={userData.data.Phone_number}
              onChange={(e) => handleInputChange('Phone_number', e.target.value)}
            />            



            {/* Update and Delete buttons */}
            <div><br/>
              <input style={{marginRight: "10px"}} type="button" value="Update" onClick={handleUpdate} disabled={!isUpdateEnabled}/>

              <input type="button" value="Delete" onClick={handleDelete} />
            </div>
          </div>
        )}
      </div>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default ManageUsers;
