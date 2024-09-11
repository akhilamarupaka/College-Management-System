import './Instructor_reports.css';
import Instructor_Navbar from './Instructor_Navbar'; 
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import axios from "axios";
function Instructor_Reports() {
    const [chartData, setChartData] = useState(null);
  const [courseID, setCourseID] = useState('');

  const [examData, setExamData] = useState(null);

  // Define the options for the chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
      },
    },
  };

  const fetchExamData = () => {
	   axios
      .get(`http://127.0.0.1:8000/api/instructor/reports?course_id=${courseID}`)
      .then((response) => {
        	  const resp = response.data;
        console.log(resp);
        if (response.status === 200) {
          ChartJS.register(
            CategoryScale,
            LinearScale,
            BarElement,
            Title,
            Tooltip
          );

           if (resp.data && Array.isArray(resp.data)) {
			const examData = resp.data;
			console.log(examData);
            const labels = examData.map((item) => item.Exam_ID);
            const scores = examData.map((item) => item.Average_Score);
            const data = {
              labels,
              datasets: [
                {
                  label: 'Student Average Score in exam',
                  data: scores,
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            };
            setExamData(data);
          }
        }else {
          console.log('An error occurred while updating the course.');
        }
      })
      .catch((error) => {
        console.error('An error occurred while fetching exam data.', error);
      });

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setExamData(null); // Clear the previous data
    fetchExamData();
  };
    return (
      <div>
        <Instructor_Navbar/>
    <main>
    <form onSubmit={handleSubmit}>
          <div id="report">
            <div className="form-group">
    <label id="courseID">Course ID:</label> 
              <input
                type="text"
                className="courseID"
                name="courseID"
                placeholder="Enter Course ID"
                value={courseID}
                onChange={(e) => setCourseID(e.target.value)}
                required
              />
            </div>

            <div class="form-group">
              <button id="module-course" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
        {examData && <Bar options={options} data={examData} />}
	</main>

</div>
    );
}

export default Instructor_Reports;
