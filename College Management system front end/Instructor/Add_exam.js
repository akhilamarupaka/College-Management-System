import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Instructor_Navbar from './Instructor_Navbar';
import './Instructor_Page.css'; 


function Add_exam() {
    const [courseId, setCourseId] = useState('');
    const [examName, setExamName] = useState('');
    const [examDate, setExamDate] = useState('');
    const [examScore, setExamScore] = useState('');
    const [examDescription, setExamDescription] = useState('');
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('exam_title', examName);
        formData.append('course_id', courseId);
        formData.append('exam_desc', examDescription); 
	    formData.append('pdfFile', file);
        formData.append('max_score',examScore);
        formData.append('pdfFileName', file.name); 
        formData.append('inst_id', localStorage.getItem('ID')); 
        const examDateFormatted = examDate.replace('T', ' ');

        formData.append('exam_date', examDateFormatted);


    try {
			 axios
    .post('http://127.0.0.1:8000/api/instructor/addexam', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}).then((response) => {
		const respons=response.data;
		 if (respons.status != 200) {
            setError('Something went wrong');
		 setSuccessMessage(' ');
		 
		 }
		else { 
   
        setSuccessMessage('Created Exam successfully.');
		 setError(' ');
      }
	})
		
	}
		

    catch (error) {
        setError("Failed to create a module");

    }
    
    
      };
    return (
      <div>
   <Instructor_Navbar/>
   <main>

<div id="container-module-course">
        <h1>Add Exam</h1>
                <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="courseId">Enter Course ID:</label>
              <input
                type="text"
                name="courseId"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                placeholder="Enter Course ID"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="examName">Exam Name:</label>
              <input
                type="text"
                name="examName"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="Enter Exam Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="examName">Exam Description:</label>
              <input
                type="text"
                name="examName"
                value={examDescription}
                onChange={(e) => setExamDescription(e.target.value)}
                placeholder="Enter Exam Description"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="examScore">Exam Max Score:</label>
              <input
                type="text"
                name="examName"
                value={examScore}
                onChange={(e) => setExamScore(e.target.value)}
                placeholder="Enter Exam Max score"
                required
              />
            </div>

            <div className="form-group">
                <label htmlFor="examDate">Exam Date and Time:</label>
                <input
                    type="datetime-local" 
                    name="examDate"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
              <label htmlFor="pdfFile">Exam File Upload:</label>
              <input
                type="file"
                name="pdfFile"
                onChange={(e) => setFile(e.target.files[0])}
                className="fileToUpload"
              />
            </div>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
              <button id="module-course" type="submit">
                Submit
              </button>
            </div>
          </form>
       
          {successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}
  
    </div>


    </main>
</div>
    );
}

export default Add_exam;
