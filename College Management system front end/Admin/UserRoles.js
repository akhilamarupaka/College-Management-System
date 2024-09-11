import React, { useState } from 'react';
import AdminPage from './AdminPage';
import './UserRoles.css';
import axios from 'axios';

function UserRoles() {
    const [userId, setUserId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestData = {
            user_id: userId,
            course_id: courseId,
        };

        axios.post('http://127.0.0.1:8000/api/admin/enroll/student', requestData)
            .then((response) => {
                if (response.status === 200) {
                    // Show a success message
                    setSuccessMessage('Student enrolled to course successfully.');
                    // Clear input fields
                    setUserId('');
                    setCourseId('');
                } else {
                    setError('An error occurred while enrolling the student.');
                }
            })
            .catch((error) => {
                setError('An error occurred while enrolling the student.');
            });
    };

    return (
        <div>
            <AdminPage />
            <form onSubmit={handleSubmit}>
                <h1>Add Student to Course</h1>

                <div className="User-Role">
                    <div className="UserRole">
                        <label>User ID: </label>
                        <input
                            style={{ width: '50%' }}
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <br />
                    </div>

                    <div className="UserRole">
                        <label>Course ID: </label>
                        <input
                            style={{ width: '50%' }}
                            type="text"
                            value={courseId}
                            onChange={(e) => setCourseId(e.target.value)}
                        />
                        <br />
                    </div>

                    <div className="UserRole">
                        <input
                            style={{ margin: '20px' }}
                            id="add-role"
                            type="submit"
                            value="ADD"
                        />
                    </div>
                </div>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default UserRoles;
