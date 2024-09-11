import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './chat.css'; // Import your CSS file
import StudentNavbar from './StudentNavbar';

function Chat_student() {
 const [userName, setUserName] = useState('');
 const qs = require('qs'); 
 const [successMessage, setSuccessMessage] = useState('');
 const [error, setError] = useState('');  
 const [messages, setMessages] = useState([]);
 const [message, setMessage] = useState('');
 const userId = localStorage.getItem('ID'); // Replace with the actual user ID

 const [userFound, setUserFound] = useState('');
  
 const handleSubmit = (event) => {
  event.preventDefault();

  axios.post('http://localhost:3001/messages', {
   senderId: userId,
   receiverId: localStorage.getItem('rid'),
   content: message,
  })
   .then(() => {
    setMessage('');
    fetchMessages();
   })
   .catch(error => console.error(error));
 };

 const fetchMessages = () => {
  axios.post('http://localhost:3001/messagesbyid', {
   senderId: userId,
   receiverId: localStorage.getItem('rid'),
   content: message,
  })   .then(response => setMessages(response.data))
   .catch(error => console.error(error));
 };

 const fetchAllChats = () => {
	 

  axios.get(`http://127.0.0.1:8000/api/cuser/finduser?Username=${userName}`).then((response) =>{
		 if(response.data.status===401){
    setError('No user found!Type correct name');
			 setSuccessMessage('');
			 setUserFound(false);
		 }
		 
		 else{
			 setUserFound(true);
			 const a=response.data.user;
		localStorage.setItem('rid',a.User_ID);
		const chatMessage = `Chatting with ${a.Username}`;
		 
		//setMessages([]);
    // setReceiverId(receiverId);
    setSuccessMessage(chatMessage);
		setError(' ')
		fetchMessages();
 
		 }
   })
    .catch((error) => {
     setError('No user found!Type correct name');
			 setSuccessMessage('');
    });
 };


 const handleFetchAllChats = () => {
  fetchAllChats(
  );
 };
 return (
  <div>
   <StudentNavbar />

   
	 <label> Enter Username: </label>
    <input
     type="text"
		 placeholder="Please enter username"
     value={userName}
     onChange={(e) => setUserName(e.target.value)}
    />
    <button onClick={handleFetchAllChats} type="submit">Find user</button>
 
     {successMessage && <div className="success-message">{successMessage}</div>}
     {error && <div className="error-message">{error}</div>}
		  
		    <div>
    
	<div id="chat">
 {messages.map((message) => {
const isSender = message.sender.id === parseInt(userId);
console.log(isSender);
  
 let messageStyle = {};
 if (isSender) {
  messageStyle = {
   textAlign: 'right',
   backgroundColor: '#007bff',
   color: '#eee',
  };
 } else {
  messageStyle = {
   textAlign: 'left',
   backgroundColor: '#eee',
   color: '#32a852',
  };
 }
 return (
   <div className="c-message" key={message.id} style={messageStyle}>
       <p>{isSender ? 'You' : userName}: {message.content}</p>
      </div>
 );
})}
</div>
	 {userFound &&  <form onSubmit={handleSubmit}>
    <input
     type="text"
     value={message}
		 placeholder="Enter message to send: "
     onChange={(event) => setMessage(event.target.value)}
    />
    <button type="submit">Send</button>
   </form>}
	  
	  
   </div>
	  
  </div>
 );
}

export default Chat_student;