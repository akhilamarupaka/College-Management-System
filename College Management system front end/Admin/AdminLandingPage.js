import React from 'react';

import { Link } from 'react-router-dom';
import AdminPage from './AdminPage';
import './AdminPage.css';

function AdminLandingPage() {
    return (
        <div>
        <AdminPage/>
        <h1>Admin Console</h1>
        <main>
       
        
        <div id="button-grid">
        <Link to="/UserRoles"><a class="button" >Add Student to Course</a></Link>
        <Link to="/ManageUsers"><a class="button">Manage Users</a></Link>   
        <Link to="/UserPermissions"><a class="button">User Permissions</a></Link>
        <Link to="/UserActivity"><a class="button">User Activity</a></Link> 
        </div>
      
        </main>
        </div>
        );
    }
    
    export default AdminLandingPage;