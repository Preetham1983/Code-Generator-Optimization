// Feedback.js
import React, { useState } from 'react';
import axios from 'axios';
import './Feedback.css';

function Feedback() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [feedback, setFeedback] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://127.0.0.1:4000/save-feedback', { name, phoneNumber, feedback });
      setSuccessMessage('Feedback submitted successfully!');
      setName('');
      setPhoneNumber('');
      setFeedback('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setErrorMessage('Error submitting feedback. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="feedback-container">
      <header className="feedback-header">
        <h1>Submit Your Feedback</h1>
      </header>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Feedback;
