import React,{useState} from 'react';
import './SignUp.css'; // Import your CSS file
import {Link} from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import Login_Nav from './Login_Nav';
import axios from 'axios';

function SignUp() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

        const clearFields = () => {
            setUserName('');
            setEmail('');
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhonenumber('');
            setPassword('');
        };

        
  const handleSignUp = (e) => {
    e.preventDefault();
    let flag=true;
	if (!email.endsWith('@mavs.uta.edu') && (!/^\d{10}$/.test(phonenumber))) {
        flag=false;
        setSuccessMessage('');
        setError('Invalid Phone number and email! Try again .');
      }
	else if (!email.endsWith('@mavs.uta.edu') && !email.endsWith('@uta.edu') && !email.endsWith('@uta.com') && !email.endsWith('@ut.com')) {
        setError('Invalid Email! Try again .');
        setSuccessMessage('');
        flag=false;

	  }
      else if (!/^\d{10}$/.test(phonenumber)) {
        setSuccessMessage('');
        setError('Invalid Phone number! Try again .');
        flag=false;

      }
      
      if(flag){
      let user_role="Student";
      if (email.endsWith('@mavs.uta.edu')) {
        flag=true;
		user_role="Student";
	  }
      if (email.endsWith('@uta.edu')) {
        flag=true;
		user_role="Instructor";
	  }
      if (email.endsWith('@uta.com')) {
        flag=true;
		user_role="Administrator";
	  }
      if (email.endsWith('@ut.com')) {
        flag=true;
		user_role="Quality Assurance Officer";
	  }


	  const requestData =  { Email: email,Password_Hashed: password,Username: username,FirstName: firstname,LastName:lastname,Address: address,Phone_number:phonenumber,User_role:user_role};
	  const qs=require('qs');
  console.log(requestData);
  if(flag){
  axios.post('http://127.0.0.1:8000/api/cuser/register',qs.stringify(requestData), {
	headers: {
	  'Content-Type': 'application/x-www-form-urlencoded',
	},
  }).then((response ) => {
		
	 const data=response.data
     if (data.status==200){
    setSuccessMessage('Successfully registered');
  
  setError('');
     }
else
setSuccessMessage('Registration Failed');
})
	.catch((error) => {
	  console.error('Error:', error);
	});
  }
}
};
    return (
        <div class="landing-page">
        <Login_Nav/>
    <div class="container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
        <div class="form-group">
			<label for="username">Username:</label>
			<input type="text" id="username" name="username" required  value={username}
              onChange={(e) => setUserName(e.target.value)}/>
		</div>
        <div class="form-group">
			<label for="email">Email:</label>
			<input type="text" id="email" name="email" required  value={email}
              onChange={(e) => setEmail(e.target.value)}/>
		</div>
        <div class="form-group">
			<label for="firstname">First Name:</label>
			<input type="text" id="firstname" name="firstname" required  value={firstname}
              onChange={(e) => setFirstName(e.target.value)}/>
		</div>
        <div class="form-group">
			<label for="lastname">Last Name:</label>
			<input type="text" id="lastname" name="lastname" required  value={lastname}
              onChange={(e) => setLastName(e.target.value)}/>
		</div>

        <div class="form-group">
			<label for="address">Address</label>
			<input type="text" id="address" name="address" required  value={address}
              onChange={(e) => setAddress(e.target.value)}/>
		</div>

        <div class="form-group">
			<label for="phonenumber">Phone Number:</label>
			<input type="text" id="phonenumber" name="phonenumber" required  value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}/>
		</div>
        <div class="form-group">
			<label for="password">Password:</label>
			<input type="password" id="password" name="passwordr" required  value={password}
              onChange={(e) => setPassword(e.target.value)}/>
		</div>
            <button type="submit" class="btn">Sign Up</button>

        </form>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {error && <div className="error-message">{error}</div>}

    </div>
        </div>
    );
}

export default SignUp;

