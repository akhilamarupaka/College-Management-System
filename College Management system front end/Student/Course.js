import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './course.css'; // Import your CSS file
import Student_Reports from './Student_Reports';
import Chat_student from './Chat_student';
import StudentNavbar from './StudentNavbar';
import Student_Sidebar from './Student_Sidebar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function Course(props) {
    const {Course_ID } = useParams(); // Access the course ID from the URL
	localStorage.setItem('c_id',Course_ID);
	
      const [coursePolicies, setCoursePolicies] = useState([]);

  useEffect(() => {
    // Make an API request to get course policies
    axios.get(`http://127.0.0.1:8000/api/dao/getpolicies?course_id=${Course_ID}`)
      .then((response) => {
        const data = response.data.policies;
        setCoursePolicies(data);
      })
      .catch((error) => {
        console.error('Error fetching course policies:', error);
      });
  }, [Course_ID]);
  
 
    return (
<div>
   <StudentNavbar/>
<h1>Course Policies</h1>
      <main>
 	 <Student_Sidebar/>
        <table style={{ width: '80%' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            {coursePolicies.map((policy) => (
              <tr key={policy.Policy_ID}>
                <td>{policy.Policy_Title}</td>
                <td>{policy.Policy_Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
    );
}

export default Course;
