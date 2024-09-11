import React, { useState } from 'react';

import QAOPage from './QAOPage';
import './Instructor_Page.css';
import axios from 'axios'; // Import Axios

<title>Create policy</title>
function Create_policy() {
    const qs = require('qs'); // Import the qs library
    const [course_id, setCourseId] = useState('');
    const [course_name, setCourseName] = useState('');
    const [policy_title, setPolicyTitle] = useState('');
    const [policy_description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const requestData = {
		 id :localStorage.getItem('ID'),
        course_id: course_id,
        course_name: course_name,
        policy_title: policy_title,
        policy_desc: policy_description,
      };
  
      const formData = qs.stringify(requestData);

      // Make a POST request using Axios
      axios
        .post('http://127.0.0.1:8000/api/dao/add/policy', formData)
        .then((response) => {
            console.log(response);
            const data = response.data;
          if (data) {
            // Show a success message
            setSuccessMessage('Policy Created successfully.');
			            setError('');

            // Clear input fields
            setCourseId('');
            setCourseName('');
            setPolicyTitle('');
            setDescription('');
          } else {
            setError('An error occurred while creating the policy.');
			setSuccessMessage(' ');
          }
        })
        .catch((error) => {
          setError('An error occurred while creating the policy.');
		  	setSuccessMessage(' ');
        });
    };

        return (
            <div>
        <QAOPage/>
 
    <div id="container-new-policy">
        <h1>New Policy</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
                <label htmlFor="course_id">Course ID</label>
                <input type="text" className="course_id" id="course_id" name="course_id" placeholder="Enter Course ID" value={course_id} onChange={(e) => setCourseId(e.target.value)} required/>
            </div>

            <div className="form-group">
                <label htmlFor="course_name">Select Course:</label>
                <input
                type="text"
                className="course_name"
                name="course_name"
                placeholder="Enter course name"
                value={course_name}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </div>
			<div className="form-group">
                <label htmlFor="policy_title">Policy title</label>
                <input type="text" className="policy_title" id="policy_title" name="policy_title" placeholder="Enter Policy title" value={policy_title} onChange={(e) => setPolicyTitle(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="policy_description">Description:</label>
                <textarea className="policy_description" name="policy_description" rows="4" placeholder="Enter policy description"  value={policy_description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>

            <div className="form-group">
                <button id="clear" type="reset">Clear</button>
            </div>
			
            <div className="form-group">
                <button id="submit-policy" type="submit">Create Policy</button>
            </div>

        </form>
		
		   {successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}
   
        </div>
        </div>
        );
        }
export default Create_policy;