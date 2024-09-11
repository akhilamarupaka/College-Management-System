import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminPage from './AdminPage';
import './UserRoles.css';

function UserPermissions() {
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedPermission, setSelectedPermission] = useState('');
    const [permissions, setPermissions] = useState([]);

    // Function to fetch permissions by role
    const fetchPermissionsByRole = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/admin/permissions/${selectedRole}`);
            const data = await response.json();
            setPermissions(data);
        } catch (error) {
            console.error('Error fetching permissions:', error);
        }
    };

    // Function to insert permission
    const insertPermission = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/admin/permissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    role: selectedRole,
                    permissions_string: selectedPermission,
                }),
            });
            const data = await response.json();
            // Handle response as needed
            console.log('Permission added:', data);
            
        } catch (error) {
            console.error('Error inserting permission:', error);
        }
    };

    // Function to delete permission
    const deletePermission = async (pid) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/admin/permissions/${pid}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            // Handle response as needed
            console.log('Permission deleted:', data);
        } catch (error) {
            console.error('Error deleting permission:', error);
        }
    };

    // Function to handle lookup button click
    const handleLookup = () => {
        fetchPermissionsByRole();
    };

    // Function to handle add button click
    const handleAdd = () => {
        insertPermission();
    };

    // Function to handle delete button click
    const handleDelete = (pid) => {
        deletePermission(pid);
    };

    return (
        <div>
            <AdminPage />
            <h1>User Permissions</h1>

            <div className="User-Role">
                <div>
                    <div>
                        <label>Role: </label>
                        <select onChange={(e) => setSelectedRole(e.target.value)}>
                            <option value="Student">Student</option>
                            <option value="Instructor">Instructor</option>
                            <option value="QAO">QAO</option>
                            <option value="Administrator">Administrator</option>
                        </select>
                        <button onClick={handleLookup}>Look Up</button>
                        <label>Permission: </label>
                        <select onChange={(e) => setSelectedPermission(e.target.value)}>
                            <option>Create Course</option>
                            <option>Manage Course</option>
                            <option>Manage Reports</option>
                            <option>Manage Policies</option>
                        </select>
                        <button onClick={handleAdd}>Add</button>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Delete</th>
                                    <th>Permission</th>
                                    <th>Description</th>
                                </tr>
                                {permissions.map((permission) => (
                                    <tr key={permission.pid}>
                                        <td>
                                            <button onClick={() => handleDelete(permission.pid)}>Delete</button>
                                        </td>
                                        <td>{permission.permissions_string}</td>
                                        <td>You can manage the course</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPermissions;
