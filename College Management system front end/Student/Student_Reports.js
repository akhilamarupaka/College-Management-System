import React, { useState } from "react";
import StudentNavbar from "./StudentNavbar";
import './student_reports.css';
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

function Student_Reports() {
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
    const studentid = localStorage.getItem('ID');

    axios
      .get(`http://127.0.0.1:8000/api/student/courses/grades?course_id=${courseID}&student_id=${studentid}`)
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
            const labels = examData.map((item) => item.Exam_ID);
            const scores = examData.map((item) => item.Score);
            const data = {
              labels,
              datasets: [
                {
                  label: 'Student Score in exam',
                  data: scores,
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            };
            setExamData(data);
		  }
		
        } else {
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
      <StudentNavbar />
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

            <div className="form-group">
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

export default Student_Reports;
