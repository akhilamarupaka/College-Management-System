import React, { useEffect, useState } from 'react';
import './course.css'; // Import your CSS file
import Student_Reports from './Student_Reports';
import Chat_student from './Chat_student';
import StudentNavbar from './StudentNavbar';
import Student_Sidebar from './Student_Sidebar';
import { Link } from 'react-router-dom';


import { useParams } from 'react-router-dom';

function Course_modules() {
	    const Course_ID = localStorage.getItem('c_id'); 
    console.log("announ", Course_ID);
    const [modules, setModules] = useState([]);
  
    useEffect(() => {
      // Make an API request to get course announcements
      fetch(`http://127.0.0.1:8000/api/student/courses/modules?course_id=${Course_ID}`)
        .then((response) => response.json())
        .then((data) => {
        const a=data.modules;
          setModules(a); 
        })
        .catch((error) => {
          console.error('Error fetching announcements:', error);
        });
    }, [ Course_ID]);
	
	const downloadPdf = (module) => {
		
           // Construct the download URL based on the backend API endpoint
    const downloadUrl = `http://127.0.0.1:8000/api/modules/${module.MODULE_FILE_NAME}`;

    // Open the URL in a new tab/window
    window.open(downloadUrl, '_blank');
    };
    return (
      <div>
   <StudentNavbar/>
<main>
             <Student_Sidebar />
          <section>
                    <h1>Modules</h1>
                    <div id="modules">
                        {modules.map((module, index) => (
                            <div key={index}>
							    <label>Module Name: </label>
                                <a  onClick={() => downloadPdf(module)}>{module.Module_Name} </a>
                                <br />
								<label>Module Description: </label>
                                <p className="line-space">{module.Module_Description}</p>
                            </div>
                        ))}
                    </div>
                </section>

    </main>

</div>
    );
}

export default Course_modules;
