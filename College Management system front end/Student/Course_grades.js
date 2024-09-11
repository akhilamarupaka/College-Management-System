import React, { useEffect, useState } from 'react';
import './course.css'; // Import your CSS file
import StudentNavbar from './StudentNavbar';
import Student_Sidebar from './Student_Sidebar';
import { useLocation } from 'react-router-dom';

import { Link, useParams } from 'react-router-dom'; // Import useParams to get URL parameters

function Course_grades(props) {
	// const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
	//const Course_ID = props.match.params.Course_ID;
	  const Course_ID  = localStorage.getItem('c_id');

    const studentid=localStorage.getItem('ID');
	 //const Course_ID = queryParams.get("Course_ID");
	// const studentid = queryParams.get("studentid");    
	const [grades, setGrades] = useState([]);

    useEffect(() => {
       
        // Fetch data from your API using courseid and studentid
        fetch(`http://127.0.0.1:8000/api/student/courses/grades?course_id=${Course_ID}&student_id=${studentid}`)
            .then((response) => response.json())
            .then((data) => {
				const g = data.data;
				setGrades(g);
            })
            .catch((error) => {
                console.error('Error fetching grades:', error);
            });
    }, [Course_ID]);

    return (
        <div>
            <StudentNavbar />
            <main>
                <Student_Sidebar />
                <section>
                    <div id="grades">
                        <h1>Grades</h1>
                        {grades.map((grade) => (
                            <div key={grade.Exam_ID}>
                                <a>Assessment-{grade.Exam_ID}</a>
                                <a>Marks: </a>
                                <input type="text" id="readonlyInput" value={`${grade.Score}/100`} readOnly />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Course_grades;
