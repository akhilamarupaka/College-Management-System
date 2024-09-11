import React,{useState,useEffect,useNavigate} from 'react';
import './Forgot.css'; // Import your CSS file
import {Link} from 'react-router-dom';
import axios from 'axios';
import Login_Nav from './Login_Nav';
import { render } from '@react-email/render';
function Forgot() {

    const [email, setEmail] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgot = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        axios
.post('http://127.0.0.1:8000/api/cuser/forgotPassword', formData)
.then((response) => {

const resp=response.data;
console.log("response",resp);
if (resp.status === 200) {
    setSuccessMessage("Email sent successfully with token");
             setError(" ");

 
 
     } 
    
else {
    setSuccessMessage(" ");
             setError("Could not send password reset mail");
}
})
.catch((error) => {
    setSuccessMessage(" ");
    setError("Please register. Email not found");

});

    };
    return (
        <div class="landing-page">
         <Login_Nav/>
    <div class="container">
        <h1>Forgot Password</h1>
        <form onSubmit={handleForgot}>
		<div class="form-group">
			<label for="email">Email:</label>
			<input type="email" id="email" name="email" required  value={email}
              onChange={(e) => setEmail(e.target.value)}/>
		</div>
		
		<button type="submit" class="btn-login-link">Forgot</button>
	</form>
	{successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}
    </div>
        </div>
    );
}

export default Forgot;

