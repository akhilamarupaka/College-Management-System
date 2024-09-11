import React, { useState } from 'react';
import './Login.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login_Nav from './Login_Nav';
import moment from 'moment';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const id = null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !email.endsWith('@mavs.uta.edu') &&
      !email.endsWith('@uta.edu') &&
      !email.endsWith('@uta.com') &&
      !email.endsWith('@ut.com')
    ) {
      alert('Invalid email format or role.');
      return;
    }

    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Password', password);
    formData.append('Token', token);
    const qs = require('qs');

    axios
      .post('http://127.0.0.1:8000/api/cuser/resetPassword', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        const data = response.data;

      

        if (data.status === 200) {
          setSuccessMessage('Password Updated successfully');
          setError(' ');
        }

        if (data.status === 401) {
          setError('Token does not match try again');
          setSuccessMessage(' ');
        }
      })
      .catch((error) => {
		 setError('Token does not match try again');
          setSuccessMessage(' ');
        console.error('Error:', error);
      });
  };

  return (
    <div className="landing-page">
      <Login_Nav />
      <div className="container">
        <h1>Password Reset:</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              style={{width:"75%"}}
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Password reset token:</label>
            <input
              style={{width:"75%"}}
              type="text"
              id="token"
              name="token"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              style={{width:"75%"}}
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-login-link">
            Submit
          </button>
        </form>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default ResetPassword;