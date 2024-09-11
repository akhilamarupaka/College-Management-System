import React, { useEffect, useState } from 'react';

import './sidebar.css'; // Import your CSS file
import './course.css'; // Import your CSS file
import Student_Reports from './Student_Reports';
import Chat_student from './Chat_student';
import StudentNavbar from './StudentNavbar';
import Student_Sidebar from './Student_Sidebar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function Course_announcements() {
    const Course_ID  = localStorage.getItem('c_id'); 
    console.log("announ", Course_ID);
    const [announcements, setAnnouncements] = useState([]);
  
    useEffect(() => {
      // Make an API request to get course announcements
      fetch(`http://127.0.0.1:8000/api/student/courses/anns?course_id=${Course_ID}`)
        .then((response) => response.json())
        .then((data) => {
        const a=data.data;
          setAnnouncements(a); 
        })
        .catch((error) => {
          console.error('Error fetching announcements:', error);
        });
    }, [ Course_ID]);
  
    return (
      <div>
   <StudentNavbar/>

    <main>
        <Student_Sidebar/>
        
        <section>
	<h1>Announcements</h1>
    <div id="announcement">
            {announcements.map((announcement, index) => (
              <div key={index}>
                <a >{announcement.Announcement_Title}</a>
                <br />
                <p className="line-space">{announcement.Announcement_Description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

</div>
    );
}

export default Course_announcements;
