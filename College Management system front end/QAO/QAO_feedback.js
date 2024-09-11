import React, { useState, useEffect } from 'react';
import QAOPage from './QAOPage';
import './QAO_pagecss.css';
import axios from 'axios';

function QAO_feedback() {
  const [forms, setForms] = useState([]);
  const [formName, setFormName] = useState('');
  
    const [formID, setFormID] = useState('');
    const [formSID, setFormSID] = useState('');

const [courseID, setCourseID] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [showForm, setShowForm] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
   const [successMessageQ, setSuccessMessageQ] = useState('');
  const [errorQ, setErrorQ] = useState('');
  let id=null;

  const addForm = () => {
    if (formName.trim() !== '' && courseID.trim() !== '') {
      axios
        .post('http://127.0.0.1:8000/api/dao/add/feedbackform', {
          form_name: formName,
          course_id: courseID,
		  id: localStorage.getItem('ID'),
        })
        .then((response) => {
          id = response.data.form;
		  setSuccessMessage(`Policy Created successfully with id of ${id}.`);
		  setError('');
        
        })
        .catch((error) => {
          console.error('Error creating the form:', error);
        });
    }
  };

  const addQuestion = (formID) => {
    if (newQuestion.trim() !== '') {
      axios
        .post('http://127.0.0.1:8000/api/dao/add/questions', {
          form_id: formID,
          question: newQuestion,
        })
        .then((response) => {
			setSuccessMessageQ(`Question created successfully.`);
		  setErrorQ('');
         

        })
        .catch((error) => {
          console.error('Error adding the question:', error);
        });
    }
  };

const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  const renderForms = (formID) => {
     axios.get(`http://127.0.0.1:8000/api/dao/form/questions?form_id=${formID}`)
      .then((response) => {
		console.log(response.data.data);
		setQuestions(response.data.data);
		setShowQuestions(true); 

        
      })
      .catch((error) => {
        console.error(`Error fetching course forms.`, error);
      });
  };

  return (
     <div>
      <QAOPage />
      <center>
        <h1>Create Feedback Form</h1>
      </center>
      <div id="container-feedback">
        <center>
          <label htmlFor="fname">Form Name:</label>
          <input
            type="text"
            id="fname"
            name="Form Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
          <label htmlFor="cid">Course Id:</label>
          <input
            type="text"
            id="cid"
            name="Course Id"
            value={courseID}
            onChange={(e) => setCourseID(e.target.value)}
          />
          <button name="addForm" onClick={addForm}>
            Create Form
          </button>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {error && <div className="error-message">{error}</div>}
        </center>
        <div>
          <label>Enter id</label>
          <input
            type="text"
            value={formID}
            onChange={(e) => setFormID(e.target.value)}
          />
          <label>Enter question</label>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <button onClick={() => addQuestion(formID)}>Add Question</button>
        </div>
        {successMessageQ && <div className="success-message">{successMessageQ}</div>}
        {errorQ && <div className="error-message">{errorQ}</div>}

        <div id="actions" className="action-buttons">
          <label>Enter id</label>
          <input
            type="text"
            value={formSID}
            onChange={(e) => setFormSID(e.target.value)}
          />
          <button name="addForm" onClick={() => renderForms(formSID)}>
            Show Questions
          </button>
          {showQuestions && (
            <div>
              <h2>Questions:</h2>
              <ul>
                {questions.map((question) => (
                  <li key={question.Question_ID}>{question.Question_Text}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}

export default QAO_feedback;
