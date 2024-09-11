import React, { useState } from 'react';
import axios from 'axios';



import { Link } from 'react-router-dom';
import Instructor_Navbar from './Instructor_Navbar';
import './Instructor_Page.css'; 


function Grade_course() {
    const [courseID, setCourseID] = useState('');
	const qs = require('qs'); 
    const [examID, setExamID] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [studentID, setStudentID] = useState('');
    const [grade, setGrade] = useState('');
    const [marks, setMarks] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
	 const handleSubmit = (event) => {
   
        event.preventDefault()
        const requestData = {
			course_id:courseID,
			exam_id:examID,
			student_id:studentID,
			inst_id:localStorage.getItem('ID'),
			grade:grade,
			marks:marks,
        };
        const formData = qs.stringify(requestData);
        axios
          .post('http://127.0.0.1:8000/api/instructor/grade/student',formData)
          .then((response) => {
            if (response.status === 200) {
                // Show a success message
                setSuccessMessage('Grade created successfully.');
                // Clear input fields
                setCourseID('');
                setExamID('');
				setStudentID('');
				setGrade('');
				setMarks('');
				setError("");
              } else {
                setError('An error occurred while grading student.');
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
   <div id="container-grade-course">
        <h1>Grade Student</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
              <label htmlFor="courseID">Enter Course ID:</label>
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
              <label htmlFor="examID">Enter Exam ID:</label>
              <input
                type="text"
                className="examID"
                name="examID"
                placeholder="Enter Exam ID"
                value={examID}
                onChange={(e) => setExamID(e.target.value)}
                required
              />
            </div>
			
			<div class="form-group">
            <label htmlFor="studentID">Student ID:</label>
              <input
                type="text"
                className="studentID"
                name="studentID"
                placeholder="Enter Student ID"
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
                required
              />
            </div>
			
			<div class="form-group">
            <label htmlFor="grade">Grade:</label>
              <input
                type="text"
                className="grade"
                name="grade"
                placeholder="Enter Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
              />
            </div>
			<div class="form-group">
            <label htmlFor="marks">Marks:</label>
              <input
                type="text"
                className="marks"
                name="marks"
                placeholder="Enter Marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
              />
            </div>
            
            {/* <div class="form-group">
                <label for="description">File Upload:</label>
                <form action="upload.php" method="POST" enctype="multipart/form-data">
					<input type="file" name="fileToUpload" class="fileToUpload"/>
				</form>
            </div> */}
			
            <div class="form-group">
                <button id="grade-course" type="submit">Submit</button>
            </div>
        </form>
		{successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}
    </div>
    </main>
</div>
    );
}

export default Grade_course;
