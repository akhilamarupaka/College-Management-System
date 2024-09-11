import React, { useState} from 'react';
import axios from 'axios';
import './LandingPage.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import './ContactUs.css';
import Login_Nav from './Login_Nav';


function Landingpage() {
		const [emailID, setEmailID] = useState('');
		const [successMessage, setSuccessMessage] = useState('');
        const [error, setError] = useState('');

		const [textContent,setTextContent] = useState('');
		const [phonenumber,setPhoneNumber] = useState('');
		const [name,setName] = useState('');

		  const handleSubmit = () => {
		  const formData = new FormData();
    formData.append('to_email', emailID);
	  formData.append('message', textContent);
	   formData.append('pn', phonenumber);
	    formData.append('name', name);
  

 
console.log("Stringify",formData);
axios
.post('http://127.0.0.1:8000/api/cuser/contactus', formData,{
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
        <div class="landing-page">
          <Login_Nav/>
            <div id="lp-hd">

                        <div className="name">
                    	<div className="form-group">
                <label htmlFor="Name">Name:</label>
                <input type="text" className="name" id="name" name="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
			</div>
			
			           <div className="name">
                    	<div className="form-group">
                <label htmlFor="phonenumber">Name:</label>
                <input type="text" className="phonenumber" id="phonenumber" name="phonenumber" placeholder="Enter Phone Number" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
            </div>
			</div>
    
                <div className="email">
            <div className="form-group">
                <label htmlFor="toEmail">Send To:</label>
                <input type="text" className="to_email" id="to_email" name="to_email" placeholder="Enter email id" value={emailID} onChange={(e) => setEmailID(e.target.value)} required/>
            </div>
			</div>
                
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
        </div>
    );
}

export default Landingpage;

