import React, { useState } from 'react';
import axios from 'axios';
import './review.css';

function ReviewPage() {
  const [inputText, setInputText] = useState(''); // For the code input
  const [reviewResponse, setReviewResponse] = useState(''); // For the review response
  const [loading, setLoading] = useState(false); // Loading state

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const data = {
      input_text: inputText,
    };

    try {
      const res = await axios.post('http://127.0.0.1:5001/review', data); // Call Flask API for code review
      setReviewResponse(res.data.reviewed_code); // Set the response (reviewed code)

      // Save query and review response to MongoDB through your Node.js backend
      await axios.post('http://127.0.0.1:4000/save-query', {
        userQuestion: inputText,
        response: res.data.reviewed_code,
      });
    } catch (error) {
      console.error('Error reviewing code:', error);
      console.error('Error details:', error.response);
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  return (
    <div className="review-page">
      <h2>Review Your Code 📝</h2>

      {/* Loading spinner */}
      {loading && (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}

      <form onSubmit={handleReviewSubmit} className="review-form">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your code here for review..."
          rows="10"
          cols="50"
        />

        <button type="submit" className="styled-button">Submit for Review</button>
      </form>

      {/* Display Review Response */}
      {reviewResponse && (
        <div className="response">
          <pre>
            <code>{reviewResponse}</code>
          </pre>
          <button
            onClick={() => {
              navigator.clipboard.writeText(reviewResponse);
              alert('Reviewed code copied to clipboard!');
            }}
            className="copy-button"
          >
            Copy Reviewed Code
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;
