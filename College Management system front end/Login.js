import React,{useState} from 'react';
import './Login.css'; // Import your CSS file
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Login_Nav from './Login_Nav';
function Login() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();

	if (!email.endsWith('@mavs.uta.edu') && !email.endsWith('@uta.edu') && !email.endsWith('@uta.com') && !email.endsWith('@ut.com')) {
		alert('Invalid email format or role.');
		return;
	  }


	  const requestData =  { Email: email,Password_Hashed: password};
	  const qs=require('qs');
	  
  console.log(requestData);
  axios.post('http://127.0.0.1:8000/api/cuser/login',qs.stringify(requestData), {
	headers: {
	  'Content-Type': 'application/x-www-form-urlencoded',
	},
  }).then((response ) => {
		const data = response.data;
		const user=data['user'];
	  console.log(user);
	  if(data.status!=200 ){
		setError('Login Failed! try again');
	  }
	  if(data.status==200 && user.User_role === "Student"){
		localStorage.setItem('isAuthenticated', true);
		localStorage.setItem('ID', user.User_ID);
		localStorage.setItem('role', user.User_role);
		navigate('/Student');
	  }

	  if(data.status==200  && user.User_role ==="Instructor"){
		localStorage.setItem('isAuthenticated', true);
		localStorage.setItem('ID', user.User_ID);
		localStorage.setItem('role', user.User_role);
		navigate('/Instructor');
	  }

	  if(data.status==200  && user.User_role ==="Administrator"){
		localStorage.setItem('isAuthenticated', true);
		localStorage.setItem('ID', user.User_ID);
		localStorage.setItem('role', user.User_role);
		navigate('/AdminLandingPage');
	  }

	  if(data.status==200  && user.User_role ==="Quality Assurance Officer"){
		localStorage.setItem('isAuthenticated', true);
		localStorage.setItem('ID', user.User_ID);
		localStorage.setItem('role', user.User_role);
		navigate('/QAOLandingPage');
	  }
	})
	.catch((error) => {
		setError('Login Failed! try again');
	  console.error('Error:', error);
	});

};

    return (
        <div class="landing-page">
     <Login_Nav/>
    <div class="container">
	<h1>Login</h1>
	<form onSubmit={handleLogin}>
		<div class="form-group">
			<label for="email">Email:</label>
			<input style={{width:"75%"}}type="email" id="email" name="email" required  value={email}
              onChange={(e) => setEmail(e.target.value)}/>
		</div>
		<div class="form-group">
			<label for="password">Password:</label>
			<input style={{width:"75%"}} type="password" id="password" name="password" required value={password}
              onChange={(e) => setPassword(e.target.value)}/>
		</div>
		<button type="submit" class="btn-login-link">Login</button>
		
	</form>
	
	<Link to="/Forgot"><button type="submit" class="btn-forgot-link"><a>Forgot Password?</a></button></Link>
	<Link to="/ResetPassword"><button type="submit" class="btn-forgot-link"><a>Reset Password</a></button></Link>
{successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}
</div>
        </div>
    );
}

export default Login;

