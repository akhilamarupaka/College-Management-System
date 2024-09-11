import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Course from './Course';
import User_profile from './User_profile';
import { Link } from 'react-router-dom';
import './Student_Page.css';
import StudentNavbar from './StudentNavbar';

function Student_Home() {
  const [courses, setCourses] = useState([]);
const id=localStorage.getItem('ID');
localStorage.removeItem('c_id')
  useEffect(() => {
 
    axios.get(`http://127.0.0.1:8000/api/student/courses?user_id=${id}`)
      .then(response => {
        console.log(response.data);
        setCourses(response.data['courses']); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <div>
      <StudentNavbar />

      <main>
        <section id="home">
          <h1>Student Console</h1>
          <br />
          <h1>Courses</h1>
          <div id="scroll-box">
            <div id="scrollable-container">
              {courses.map(course => (
                <Link to={`/Course/${course.Course_ID}`} key={course.Course_ID}>
                  <div className="box">
                    <h3>Course Name: {course.Course_Name}</h3>
                    <h3>Course Description: {course.Course_Description}</h3>
                    <h3>Course ID: {course.Course_ID}</h3>
                    
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Student_Home;
