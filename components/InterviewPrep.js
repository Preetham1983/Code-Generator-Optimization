import React, { useState } from 'react';
import axios from 'axios';
import './interviewprep.css'; 

const InterviewPrep = () => {
  const [topic, setTopic] = useState(''); 
  const [questions, setQuestions] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 

  // Handle topic change
  const handleTopicChange = (e) => {
    setTopic(e.target.value);
    setError(''); // Reset error on new input
  };

  // Fetch interview questions based on topic
  const fetchQuestions = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loading
    setError(''); // Clear any previous errors

    try {
      const response = await axios.post('http://localhost:5001/generate_questions', { topic });
      setQuestions(response.data.questions.split('\n').filter(q => q.trim() !== '')); // Parse and set questions
      await axios.post('http://127.0.0.1:4000/save-query', {
        userQuestion: topic,
        response: JSON.stringify(response.data.questions.split('\n').filter(q => q.trim() !== '')),
    });
    
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to generate questions. Please try again.'); // Set error message
    } finally {
      setLoading(false); // Hide loading
    }
  };

  return (
    <div className="interview-prep-page">
      <h2>Interview Preparation 🎯</h2>

      {/* Display loading spinner */}
      {loading && (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Error message display */}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={fetchQuestions} className="interview-form">
        <input 
          type="text" 
          value={topic} 
          onChange={handleTopicChange} 
          placeholder="Enter interview topic"
          className="topic-input"
        />
        <button type="submit" className="styled-button">Generate Questions</button>
      </form>

      {/* Display Generated Questions */}
      {questions.length > 0 && (
        <div className="questions-response">
          <h3>Generated Questions</h3>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;
