import React,{useState,useEffect} from 'react';
import './Instructor_Profile.css'; // Import your CSS file
import Instructor_Navbar from './Instructor_Navbar';
import axios from 'axios';
  
const updateForm = () => {
  
  const popupForm = document.createElement('div');
popupForm.id = 'myForm';

const nameLabel = document.createElement('label');
nameLabel.for = 'name';
nameLabel.textContent = 'First Name:';

const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.id = 'fname';
nameInput.placeholder = 'Enter your First name';

const enameLabel = document.createElement('label');
enameLabel.for = 'ename';
enameLabel.textContent = 'Email:';
const enameInput = document.createElement('input');

enameInput.type = 'text';
enameInput.id = 'ename';
enameInput.placeholder = 'Enter your Email';

const lnameLabel = document.createElement('label');
lnameLabel.for = 'lname';
lnameLabel.textContent = 'Last Name:';
const lnameInput = document.createElement('input');

lnameInput.type = 'text';
lnameInput.id = 'lname';
lnameInput.placeholder = 'Enter your Last name';


const addressLabel = document.createElement('label');
addressLabel.for = 'address';
addressLabel.textContent = 'Address:';
const addressInput = document.createElement('input');
addressInput.type = 'text';
addressInput.id = 'address';
addressInput.placeholder = 'Enter your address';

const phoneLabel = document.createElement('label');
phoneLabel.for = 'phone';
phoneLabel.textContent = 'Phone:';
const phoneInput = document.createElement('input');
phoneInput.type = 'text';
phoneInput.id = 'phone';
phoneInput.placeholder = 'Enter your phone number';

const successMessage = document.createElement('div');
successMessage.id = 'successMessage';
successMessage.style.color = 'green'; 
popupForm.appendChild(successMessage);

const errorMessage = document.createElement('div');
errorMessage.id = 'errorMessage';
errorMessage.style.color = 'red'; 
popupForm.appendChild(errorMessage);

popupForm.appendChild(nameLabel);
popupForm.appendChild(nameInput);

popupForm.appendChild(lnameLabel);
popupForm.appendChild(lnameInput);
popupForm.appendChild(enameLabel);
popupForm.appendChild(enameInput);

popupForm.appendChild(addressLabel);
popupForm.appendChild(addressInput);
popupForm.appendChild(phoneLabel);
popupForm.appendChild(phoneInput);

const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.id = 'updateForm';
submitButton.textContent = 'Update';
submitButton.addEventListener('click', () => {
 let flag=true;
 const qs=require('qs');
 const userid=localStorage.getItem('ID');
 const fname= document.getElementById('fname').value;
 const lname = document.getElementById('lname').value;
 const address = document.getElementById('address').value;
 const phoneNumber = document.getElementById('phone').value;
 const email = document.getElementById('ename').value;
 if (!email.endsWith('@uta.edu') ) {
   flag=false;
   successMessage.textContent = "";
       errorMessage.textContent = "Invalid Email. Try again";
}
 if (!/^\d{10}$/.test(phoneNumber)) {
   flag=false;
   successMessage.textContent = "";
   errorMessage.textContent = "Invalid Phone number. Try again";
 }

 if (!email.endsWith('@uta.edu') && (!/^\d{10}$/.test(phoneNumber))) {
   flag=false;
   successMessage.textContent = "";
   errorMessage.textContent = "Invalid Phone number and email. Try again";
 }

 if(flag){
 const formData = new FormData();
 formData.append('id', userid);
 formData.append('FirstName', fname);
 formData.append('LastName', lname);
 formData.append('Address', address);
 formData.append('Phone_number', phoneNumber);
 formData.append('Email', email);

console.log("Stringify",formData);
axios
.post('http://127.0.0.1:8000/api/cuser', formData,{
	headers: {
    'Content-Type': 'application/json',
  },
})
.then((response) => {
console.log("response",response);
const resp=response.data;
if (resp.status=== 200) {
 successMessage.textContent = "Profile updated successfully.";
       errorMessage.textContent = "";
 
} else {
 successMessage.textContent = "Failed to update. Try Again";
       errorMessage.textContent = "";
}
})
.catch((error) => {
errorMessage.textContent = "An error occurred while updating the profile.";
successMessage.textContent = "";

});
}
});

popupForm.appendChild(submitButton);


document.body.appendChild(popupForm);

popupForm.style.display = 'block';
const closeButton = document.createElement('button');
closeButton.id = 'closeForm';
closeButton.textContent = 'Close';

popupForm.appendChild(closeButton);
closeButton.addEventListener('click', () => {
popupForm.style.display = 'none';
});


};


function Instructor_Profile() {

 const studentid=localStorage.getItem('ID');
   
 const [profile, setProfile] = useState([]);


 useEffect(() => {
    
     // Fetch data from your API using courseid and studentid
    fetch(`http://127.0.0.1:8000/api/cuser/profile?id=${studentid}`)
         .then((response) => response.json())
         .then((data) => {
             console.log(data);
             setProfile(data.data);
         })
         .catch((error) => {
             console.error('Error fetching response:', error);
         });
 }, [studentid]);
    return (
      <div>
     <Instructor_Navbar/>

	<main>
        <section class="profile">
        <div id="profile-button">
            <button id="edit-profile-button" onClick={() => updateForm()} align="right"> Edit </button>
            <br/>
            </div>
            <div className="field">
                        <label htmlFor="name">First Name:</label>
                        <span id="name">{profile.FirstName}</span>
                    </div>
                    <div className="field">
                        <label htmlFor="name">Last Name:</label>
                        <span id="name">{profile.LastName}</span>
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email:</label>
                        <span id="email">{profile.Email}</span>
                    </div>
                    <div className="field">
                        <label htmlFor="address">Address:</label>
                        <span id="email">{profile.Address}</span>
                    </div>
                    <div className="field">
                        <label htmlFor="email">Phone Number:</label>
                        <span id="email">{profile.Phone_number}</span>
                    </div>               
        </section>
    </main>
</div>
    );
}

export default Instructor_Profile;
