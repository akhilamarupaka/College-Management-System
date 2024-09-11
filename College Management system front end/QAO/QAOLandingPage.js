import React from 'react';

import { Link } from 'react-router-dom';
import QAOPage from './QAOPage';
import './Instructor_Page.css';

function QAOLandingPage() {
    return (
        <div>
        <QAOPage/>
        <h1>QAO Console</h1>
        <main>
       
        
        <div id="button-grid">
        <Link to="/Create_policy"><a class="button" >Create_policy</a></Link>
        <Link to="/Manage_policy"><a class="button">Modify Policy</a></Link>   
        <Link to="/QAO_feedback"><a class="button">Feedback forms</a></Link>
        <Link to="/QAO_emails"><a class="button">Emails</a></Link> 
        </div>
      
        </main>
        </div>
        );
    }
    
    export default QAOLandingPage;