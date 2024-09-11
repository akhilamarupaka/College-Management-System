import React from 'react';


import { Link } from 'react-router-dom';
import Instructor_Navbar from './Instructor_Navbar';
import './Instructor_Page.css'; // Import your CSS file
import Create_course from './Create_course';
import Manage_course from './Manage_course';
import Grade_course from './Grade_course';
import Add_Module from './Add_Module';
import Add_exam from './Add_exam';
import Make_announcement from './Make_announcement';
import Instructor_programs_landing_page from './Instructor_programs_landing_page';


function Instructor_Page() {
    return (
      <div>
   <Instructor_Navbar/>
   <h1>Instructor Console</h1>
   <main>
        
        
        
        <div id="button-grid">
        <Link to="/Create_course"><a class="button-home" >Create Course</a> </Link>
        <Link to="/Manage_course"><a class="button-home">Manage Course</a></Link>   
        <Link to="/Grade_course"><a class="button-home" >Grades</a></Link>
        <Link to="/Add_Module"><a class="button-home">Add Modules</a></Link> 
        <Link to="/Add_exam"><a class="button-home">Add Exam</a></Link>
        <Link to="/Make_announcement"><a class="button-home">Make Announcements</a></Link> 
        <Link to="/Instructor_LandingPage"><a class="button1">Show Courses</a></Link> 
        </div>
        
        </main>
    
</div>
    );
}

export default Instructor_Page;
