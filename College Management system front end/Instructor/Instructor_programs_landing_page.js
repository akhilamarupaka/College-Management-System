import React,{useState} from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Instructor_Navbar from './Instructor_Navbar';
import './instructor_landing_page.css'; 



function Instructor_programs_landing_page() {
	const [courseID, setCourseID] = useState('');
	const [coursePolicies, setCoursePolicies] = useState([]);

const handleShow = () => {
     axios.get(`http://127.0.0.1:8000/api/dao/getpolicies?course_id=${courseID}`)
      .then((response) => {
        const data = response.data.policies;
        setCoursePolicies(data);
      })
      .catch((error) => {
        console.error('Error fetching course policies:', error);
      });
	
  };
    return (
      <div>
   <Instructor_Navbar/>
   <main>

    <div id="home-instructor">
    <h1>Welcome to the Department of Computer Science and Engineering</h1>
		<h3>Below are the courses offered by the department.</h3>
   <section class="home">
        
		</section>
		
             <div id="home-instructor">
	<div className="form-group">
                <label htmlFor="policy_title">Course ID:</label>
                <input type="text" className="policy_title" id="course_id" name="course_id" placeholder="Enter Course ID" value={courseID} onChange={(e) => setCourseID(e.target.value)} required/>
            </div>
			</div>
			
  <button type="button" id= "show" onClick={() => handleShow()}>
                        Show
                      </button>
<div id="landing-home">

     <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Policy Title</th>
              <th>Policy description</th>
            </tr>
          </thead>
          <tbody>
            {coursePolicies.map((policy) => (
              <tr key={policy.Policy_ID}>
                <td>{policy.Policy_Title}</td>
                <td>{policy.Policy_Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    </div>
    </main>
</div>
    );
}

export default  Instructor_programs_landing_page;
