import React, { useState, useEffect } from 'react';
import AdminPage from './AdminPage';
import './UserActivity.css';

function UserActivity() {
    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        // Fetch activity data from the API
        fetch('http://127.0.0.1:8000/api/admin/activity')
            .then(response => response.json())
            .then(data => setActivityData(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <AdminPage />
            <section>
                <h1>User Activity</h1>

                <div className="table-container">
                    <table>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Time Stamp</th>
                                <th>Action</th>
                                <th>Description</th>
                            </tr>
                            {activityData.map(activity => (
                                <tr key={activity.Activity_ID}>
                                    <td>{activity.Activity_ID}</td>
                                    <td>{activity.User_ID}</td>
                                    <td>{activity.ActivityDate}</td>
                                    <td>{activity.ActivityName}</td>
                                    <td>{activity.Description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default UserActivity;
