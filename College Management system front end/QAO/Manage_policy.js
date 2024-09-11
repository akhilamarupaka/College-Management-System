import React, { useState, useEffect } from 'react';
import QAOPage from './QAOPage';
import './QAO_pagecss.css';
import axios from 'axios';

function Manage_policy() {
  const [coursePolicies, setCoursePolicies] = useState([]);
  const [courseID, setCourseID] = useState('');
  const [editPolicy, setEditPolicy] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
 
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/dao/getpolicies?course_id=${courseID}`
      );
      setCoursePolicies(response.data.policies);
    } catch (error) {
      console.error(`Error fetching course policies for ${courseID}.`, error);
    }
  };

  const handleUpdate = (policyID) => {
    const requestData = {
	  id: localStorage.getItem('ID'),
      policy_id: policyID,
      policy_title: editedTitle,
      policy_desc: editedDescription,
    };
	 const qs = require('qs'); // Import the qs library

	   const formData = qs.stringify(requestData);
  
    axios
      .post(
        'http://127.0.0.1:8000/api/dao/update/policy',formData
      )
      .then((response) => {
        console.log(response.data.message);
        setEditPolicy(null);
        setEditedTitle('');
        setEditedDescription('');
        handleSubmit(); // Fetch and display updated data
      })
      .catch((error) => {
        console.error('Error updating course policy.', error);
      });
  };
  
  const handleEdit = (policy) => {
    setEditPolicy(policy.Policy_ID);
    setEditedTitle(policy.Policy_Title);
    setEditedDescription(policy.Policy_Description);
  };

  const handleDelete = (policyID) => {
	  const requestData = {
		id: localStorage.getItem('ID'),
        policy_id: policyID,
      };
	      const qs = require('qs'); // Import the qs library

	   const formData = qs.stringify(requestData);
    axios
      .post('http://127.0.0.1:8000/api/dao/delete/policy', formData )
      .then((response) => {
        console.log(response.data.message);
        handleSubmit(); // Fetch and display updated data
      })
      .catch((error) => {
        console.error('Error deleting course policy.', error);
      });
  };

  const handleCancelEdit = () => {
    setEditPolicy(null);
    setEditedTitle('');
    setEditedDescription('');
  };

  useEffect(() => {
    // Fetch initial data on component mount (assuming you want to display policies for a default course)
    handleSubmit();
  }, []);

  return (
    <div id="container-manage-policy">
      <QAOPage />
      <h1>Manage policy</h1>
      <main>
        <form onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}>
          <label htmlFor="courseID">Enter Course ID:</label>
          <input
            type="text"
            id="courseID"
            value={courseID}
            onChange={(e) => setCourseID(e.target.value)}
          />
          <button type="submit">Get Policies</button>
        </form>
        <table style={{ width: '80%' }}>
          <thead>
            <tr>
              <th>Policy ID</th>
              <th>Course name</th>
              <th>Policy description</th>
           
            </tr>
          </thead>
          <tbody>
            {coursePolicies.map((policy) => (
              <tr key={policy.Policy_ID}>
                <td>{policy.Policy_ID}</td>
                <td>{policy.Course_Name}</td>
                <td>
                  {editPolicy === policy.Policy_ID ? (
                    <div>
                      <div>
                        Title:{' '}
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        Description:{' '}
                        <input
                          type="text"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                        />
                      </div>
                      <button type="button" onClick={() => handleUpdate(policy.Policy_ID)}>
                        Update
                      </button>
                      <button type="button" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div>Title: {policy.Policy_Title}</div>
                      <div>Description: {policy.Policy_Description}</div>
                      <button type="button" onClick={() => handleEdit(policy)}>
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDelete(policy.Policy_ID)}>
                        Delete
                      </button>
                    </div>
                  )}
                </td>
           
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default Manage_policy;
