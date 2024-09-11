import React,{useState} from 'react';


import { Link } from 'react-router-dom';
import Instructor_Navbar from './Instructor_Navbar';
import './Instructor_Page.css'; // Import your CSS file
import axios from 'axios';

function Manage_course() {
    const qs = require('qs'); // Import the qs library


    const [courseID, setCourseID] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
   
        event.preventDefault()
        const requestData = {
          c_id: courseID,
          c_desc: courseDescription,
		  inst_id : localStorage.getItem('ID'),
        };
        const formData = qs.stringify(requestData);
        axios
          .post('http://127.0.0.1:8000/api/instructor/updatecourse/',formData)
          .then((response) => {
            if (response.status === 200) {
                // Show a success message
                setSuccessMessage('Course updated successfully.');
                // Clear input fields
                setCourseID('');
                setCourseDescription('');
              } else {
                setError('An error occurred while updating the course.');
              }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
    return (
      <div>
   <Instructor_Navbar/>
   <main>
   <div id="container-manage-course">
        <h1>Manage Course</h1>
        <form onSubmit={handleSubmit}>
            {/* <div class="form-group">
                <label for="description">Select Course:</label>
            <select class="options">
				<option value="option1">Course 1</option>
				<option value="option2">Course 2</option>
				<option value="option3">Course 3</option>
				<option value="option4">Course 4</option>
				<option value="option5">Course 5</option>
			</select>
            </div> */}
	            <div className="form-group">
              <label htmlFor="courseID">Course ID:</label>
              <input
                type="text"
                className="courseID"
                name="courseID"
                placeholder="Enter Course ID"
                value={courseID}
                onChange={(e) => setCourseID(e.target.value)}
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
            <div class="form-group">
                <button id="update-course" type="submit">Update Course</button>
            </div>
        </form>
        {successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}
    </div>

        </main>
    
</div>
    );
}

export default Manage_course;
