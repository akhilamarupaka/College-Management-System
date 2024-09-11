import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Instructor_Navbar from './Instructor_Navbar';
import './Instructor_Page.css';

function Create_course() {
    const qs = require('qs'); // Import the qs library

  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const instid=localStorage.getItem('ID');

  const handleSubmit = (event) => {
    event.preventDefault()

    const requestData = {
      c_name: courseName,
      c_code: courseCode,
      c_desc: courseDescription,
      instructor_id: instid, 
    };
    const formData = qs.stringify(requestData);

    axios
    .post('http://127.0.0.1:8000/api/instructor/createcourse', formData)
    .then((response) => {
		console.log(response);
	if (response.status === 500) {
        setError('Enter correct course id.');
      }
      if (response.status === 200) {
        // Show a success message
        setSuccessMessage('Created Course successfully.');
        // Clear input fields
        setCourseName('');
        setCourseCode('');
        setCourseDescription('');
      } 
    })
    .catch((error) => {
     if (error.response && error.response.status === 500) {
          setError('Enter correct course id.');
        } else {
          // Reset the error state for other types of errors
          setError('An error occurred while creating the course.');
        }
    });
};

  return (
    <div>
      <Instructor_Navbar />
      <main>
        <div id="container-course">
          <form onSubmit={handleSubmit}>
            <h1>Create Course</h1>

            <div className="form-group">
              <label htmlFor="courseName">Course Name:</label>
              <input
                type="text"
                className="courseName"
                name="courseName"
                placeholder="Enter course name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="courseCode">Course Code:</label>
              <input
                type="text"
                className="courseCode"
                name="courseCode"
                placeholder="Enter Course code"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="courseDescription">Description:</label>
              <textarea
                className="courseDescription"
                name="courseDescription"
                rows="4"
                placeholder="Enter course description"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* <div className="form-group">
              <label htmlFor="addStudents">Add Students: <br /></label>
              <div className="drop-down">
                <select multiple="multiple" className="options">
                  <option value="option1">Student 1</option>
                  <option value="option2">Student 2</option>
                  <option value="option3">Student 3</option>
                  <option value="option4">Student 4</option>
                  <option value="option5">Student 5</option>
                </select>
              </div>
            </div> */}
            <br />
            <div className="form-group">
              <button id="create-course" type="submit">Create Course</button>
            </div>
          </form>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}
        </div>
      </main>
    </div>
  );
}

export default Create_course;
