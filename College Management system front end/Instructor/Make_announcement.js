import React, { useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Instructor_Navbar from './Instructor_Navbar';
import './Instructor_Page.css'; 

const containerStyle = {
    whiteSpace: 'pre-line',
  };

function Make_announcement() {
    const qs = require('qs'); 
    const [courseID, setCourseID] = useState('');
    const [announcementHeader,setAnnouncementHeader]= useState('');
    const [announcementDescription,setAnnouncementDescription]=useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = (event) => {
   
        event.preventDefault()
        const requestData = {
          course_id: courseID,
          ann_title: announcementHeader,
          ann_desc:announcementDescription,
		  inst_id:localStorage.getItem('ID'),
        };
        const formData = qs.stringify(requestData);
        axios
          .post('http://127.0.0.1:8000/api/instructor/makeannouncement',formData)
          .then((response) => {
            if (response.status === 200) {
                // Show a success message
                setSuccessMessage('Announcement created successfully.');
                // Clear input fields
                setCourseID('');
                setAnnouncementDescription('');
                setAnnouncementHeader('');
				setError("");
              } else {
                setError('An error occurred while creating announcement.');
				 setSuccessMessage(' ');
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
   <div id="container-announcement-course">
        <h1>Add Announcement</h1>
        <form onSubmit={handleSubmit}>
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
              <label htmlFor="announcementHeader">Announcement Header:</label>
              <input
                type="text"
                className="announcementHeader"
                name="announcementHeader"
                placeholder="Enter Announcement Header"
                value={announcementHeader}
                onChange={(e) => setAnnouncementHeader(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="announcementDescription">Announcement Description:</label>
              <input
                type="text"
                className="announcementDescription"
                name="announcementDescription"
                placeholder="Enter Announcement Description"
                value={announcementDescription}
                onChange={(e) => setAnnouncementDescription(e.target.value)}
                required
              />
            </div>
			
	
			
            <div class="form-group">
                <button id="announcement-course" type="submit">Submit</button>
            </div>
        </form>
        {successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}
    </div>
    </main>
</div>
    );
}

export default  Make_announcement;
