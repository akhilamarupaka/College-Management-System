import React from 'react';
import './sidebar.css'; // Import your CSS file
import Student_Reports from './Student_Reports';
import Chat_student from './Chat_student';
import StudentNavbar from './StudentNavbar';
import { Link } from 'react-router-dom';
import Course_announcements from './Course_announcements';
import Course_grades from './Course_grades';
import Course_modules from './Course_modules';
import Course_assesments from './Course_assessments';


function Student_Sidebar(props) {
    const Course_ID = localStorage.getItem('c_id');
    const studentid=localStorage.getItem('ID');
    console.log("course id ",Course_ID);

    return (
      <div>
   
        <aside class="sidebar">
            <ul>
            <li><Link to={`/Course/${Course_ID}`}>Course</Link></li>
            <li><Link to={`/Course_announcements/${Course_ID}`}>Announcements</Link></li>
          <li>  <Link to={`/Course_grades/${Course_ID}`}>Grades</Link></li>
            <li><Link to={`/Course_modules/${Course_ID}`}>Modules</Link></li>
            <li><Link to={`/Course_assesments/${Course_ID}`}>Assessments</Link></li>
            </ul>
        </aside>
        

</div>
    );
}

export default Student_Sidebar;
