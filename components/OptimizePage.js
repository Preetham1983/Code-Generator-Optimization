import React, { useState } from 'react';
import axios from 'axios';
import './optimize.css';

function OptimizePage() {
  const [inputText, setInputText] = useState(''); // For the code input
  const [optimizedResponse, setOptimizedResponse] = useState(''); // For the optimized response
  const [loading, setLoading] = useState(false); // Loading state

  const handleOptimizeSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    const data = {
      input_text: inputText,
    };

    try {
      const res = await axios.post('http://127.0.0.1:5001/optimize', data); // Call Flask API for optimization
      console.log('API Response:', res.data)
      setOptimizedResponse(res.data.optimized_code); // Set the response (optimized code)

      // Save query and optimized response to MongoDB through your Node.js backend
      await axios.post('http://127.0.0.1:4000/save-query', {
        userQuestion: inputText,
        response: res.data.optimized_code,
      });
    } catch (error) {
      console.error('Error optimizing code:', error);
      console.error('Error details:', error.response);
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  return (
    <div className="optimize-page">
      <h2>Optimize Your Code ⚙️</h2>

      {/* Loading spinner */}
      {loading && (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}

      <form onSubmit={handleOptimizeSubmit} className="optimize-form">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your code here..."
          rows="10"
          cols="50"
        />

        <button type="submit" className="styled-button">Optimize Code</button>
      </form>

      {/* Display Optimized Response */}
      {optimizedResponse && (
        <div className="response">
          <pre>
            <code>{optimizedResponse}</code>
          </pre>
          <button
            onClick={() => {
              navigator.clipboard.writeText(optimizedResponse);
              alert('Optimized code copied to clipboard!');
            }}
            className="copy-button"
          >
            Copy Optimized Code
          </button>
        </div>
      )}
    </div>
  );
}

export default OptimizePage;
