import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Instructor_Navbar from './Instructor_Navbar';
import './Instructor_Page.css'; 


function Add_Module() {
  const [courseId, setCourseId] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('m_name', moduleName);
    formData.append('course_id', courseId);
	 formData.append('instid', localStorage.getItem('ID'));
    formData.append('m_desc', moduleDescription); // You can add description if needed
    formData.append('pdfFile', file);
    formData.append('pdfFileName', file.name); // Send the file name


    try {
			 axios
    .post('http://127.0.0.1:8000/api/instructor/addmodule', formData).then((response) => {

		 if (response.status != 200) {
            setError('Something went wrong');
		 setSuccessMessage(' ');
		 
		 }
		else { 
   
        setSuccessMessage('Created Module successfully.');
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
        <h1>Add Module</h1>
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
              <label htmlFor="moduleName">Material Name:</label>
              <input
                type="text"
                name="moduleName"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                placeholder="Enter Material Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="moduleName">Module Description:</label>
              <input
                type="text"
                name="moduleName"
                value={moduleDescription}
                onChange={(e) => setModuleDescription(e.target.value)}
                placeholder="Enter Material Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pdfFile">File Upload:</label>
              <input
                type="file"
                name="pdfFile"
                onChange={(e) => setFile(e.target.files[0])}
                className="fileToUpload"
              />
            </div>
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

export default Add_Module;
