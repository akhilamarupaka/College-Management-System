import React, { useEffect, useState } from 'react';
import './course.css'; // Import your CSS file
import Student_Reports from './Student_Reports';
import Chat_student from './Chat_student';
import StudentNavbar from './StudentNavbar';
import Student_Sidebar from './Student_Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Course_assesments() {
		    const Course_ID = localStorage.getItem('c_id'); 
    console.log("announ", Course_ID);
    const [modules, setModules] = useState([]);
	 const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
	//const [examId,setExamId]= useState();
	const handleUpload = (examID) => {
    const selectedFile = document.getElementById('fileUpload').files[0];
      if (selectedFile) {
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);
	formData.append('pdfFileName', selectedFile.name);
	formData.append('exam_id', examID);
    formData.append('student_id', localStorage.getItem('ID'));

    axios.post('http://127.0.0.1:8000/api/student/courses/uploadexam', formData)
      .then(response => {
        console.log('Solution uploaded successfully');
		 setError(' ');
		 setSuccessMessage('successfully submitted');
      })
      .catch(error => {
        console.error('Error uploading solution:', error);
		 setError('Something went wrong');
		 setSuccessMessage(' ');
      });
  }
  };

    useEffect(() => {
      fetch(`http://127.0.0.1:8000/api/student/courses/assessments?course_id=${Course_ID}`)
        .then((response) => response.json())
        .then((data) => {
        const a=data.data;
          setModules(a); 
        })
        .catch((error) => {
          console.error('Error fetching modules:', error);
		  
        });
    }, [ Course_ID]);
	const downloadPdf = (module) => {
         const downloadUrl = `http://127.0.0.1:8000/api/modules/${module.Exam_file_name}`;

    window.open(downloadUrl, '_blank');
    };
    return (
      <div>
   <StudentNavbar/>

    <main>
        <Student_Sidebar/>
            
	<section>
	<h1>Course Exams</h1>
	<div id="assessment">
	
    <section>
                    <div id="assessment">
                        {modules.map((module, index) => (
                            <div key={index}>
							    <label>Exam Title: </label>
                                <a  onClick={() => downloadPdf(module)}> {module.Exam_Title} </a>
                                <br />
								<label>Exam Description: </label>
                                <p className="line-space">{module.Exam_Description}</p>
								<label>Exam Max Score: </label>
                                <p className="line-space">{module.Exam_Max_Score}</p>
								<label>Upload Solution: </label>
								<input class="file-exam" type="file" id="fileUpload" name="fileUpload" />
								<br/>
								 <button onClick={() => handleUpload(module.Exam_ID)}>Upload</button>
								  {successMessage && <div className="success-message">{successMessage}</div>}
									{error && <div className="error-message">{error}</div>}
                            </div>
                        ))}
                    </div>
                </section>

	</div>
	</section>
 
    </main>

</div>
    );
}

export default Course_assesments;
