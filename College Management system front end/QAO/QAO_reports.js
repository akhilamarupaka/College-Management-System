import React, { useState } from 'react';
import QAOPage from './QAOPage';
import './QAO_pagecss.css';
import axios from 'axios';
import Chart from 'chart.js/auto';

function QAO_reports() {
  const [instructorId, setInstructorId] = useState('');
  const [instructorReports, setInstructorReports] = useState([]);

  const showReports = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/dao/get/reports?id=${instructorId}`);
      setInstructorReports(response.data.reports);
      createBarGraph(response.data.reports); // Call function to create bar graph
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const createBarGraph = (reports) => {
    const ctx = document.getElementById('barChart').getContext('2d');
    const courseNames = reports.map((report) => report.Course_Name);
    const averageScores = reports.map((report) => report.Average_Score);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: courseNames,
        datasets: [{
          label: 'Average Score',
          data: averageScores,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div>
      <QAOPage />
      <main>
        <div id="report">
          <div className="form-group">
            <label htmlFor="instructorId">Enter Instructor ID:</label>
            <input
              type="text"
              id="instructorId"
              value={instructorId}
              onChange={(e) => setInstructorId(e.target.value)}
            />
          </div>
          <button id="show-report" onClick={showReports}>
            Show Reports
          </button>
          <div className="report-results">
            <canvas id="barChart" width="400" height="200"></canvas>
          </div>
        </div>
      </main>
    </div>
  );
}

export default QAO_reports;