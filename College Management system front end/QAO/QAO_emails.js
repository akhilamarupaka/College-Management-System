import QAOPage from './QAOPage';
import React, { useState} from 'react';
import axios from 'axios';
import './Instructor_Page.css';
//import './email_pagecss.css';

<title>QAO Email</title>

    function QAO_emails() 
    {
		  const [emailID, setEmailID] = useState('');
		    const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

		  const [textContent,setTextContent] = useState('');
		  const handleSubmit = () => {
		  const formData = new FormData();
    formData.append('to_email', emailID);
	  formData.append('message', textContent);
  

 
console.log("Stringify",formData);
axios
.post('http://127.0.0.1:8000/api/dao/sendEmail', formData,{
	headers: {
    'Content-Type': 'application/json',
  },
})
.then((response) => {
console.log("response",response);
const resp=response.data;
  if (resp.success === 200) {
    setSuccessMessage("Email sent successfully.");
    setError("");
    
  } else {
	      setSuccessMessage("");

    setError("Could not send");
  }
})
.catch((error) => {
	    setSuccessMessage("");

  setError("Could not send");

});
  };
        return (
            <div>
            <QAOPage/>
              <center>
                <h1>QAO Email System</h1>
              </center>
              <main>
                <div id="qao-email">
                <div className="email">
                    	<div className="form-group">
                <label htmlFor="toEmail">Send To:</label>
                <input type="text" className="to_email" id="to_email" name="to_email" placeholder="Enter Sender email id" value={emailID} onChange={(e) => setEmailID(e.target.value)} required/>
            </div>
			</div>
                  <hr />
                  <div className="input-container">
                    Message:<br />
                    <textarea name="Contact-Message" rows="10" cols="100" value={textContent} onChange={(e) => setTextContent(e.target.value)} required></textarea>
                    <br /><br />
                  </div>
                     <button type="send-button" onClick={() => handleSubmit()}>
                        Send
                      </button>
             {successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}
                </div>
		 
              </main>
            </div>
          );
        }
        
export default QAO_emails;
      
        
        
        
        