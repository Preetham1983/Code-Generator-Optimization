import React, { useState } from 'react';
import axios from 'axios';
import './dbug.css';
function DebugPage() {
  const [debugText, setDebugText] = useState(''); // For the debug code input
  const [debugResponse, setDebugResponse] = useState(''); // For the debug response
  const [language, setLanguage] = useState('java'); // Default language for debugging
  const [loading, setLoading] = useState(false); // Loading state

  const handleDebugSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    const data = {
      code_with_bug: debugText,
      language: language,
    };

    try {
      const res = await axios.post('http://127.0.0.1:5001/debug', data); // Call Flask API for debugging
      setDebugResponse(res.data.debugged_code); // Set the response (debugged code)

      // Save query and debug response to MongoDB through your Node.js backend
      await axios.post('http://127.0.0.1:4000/save-query', {
        userQuestion:  debugText,
        response: res.data.debugged_code,
        language: language,
      });
    } catch (error) {
      console.error('Error debugging code:', error);
      console.error('Error details:', error.response);
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  return (
    <div className="debug-page">
      <h2>Debug Your Code 🛠️</h2>

      {/* Loading spinner */}
      {loading && (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}

      <form onSubmit={handleDebugSubmit} className="debug-form">
        <textarea
          value={debugText}
          onChange={(e) => setDebugText(e.target.value)}
          placeholder="Paste your buggy code here..."
          rows="10"
          cols="50"
        />

        {/* <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="c++">C++</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="c#">C#</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="ruby">Ruby</option>
          <option value="go">Go</option>
          <option value="swift">Swift</option>
          <option value="typescript">TypeScript</option>
        </select> */}

        <button type="submit" className="styled-button">Debug Code</button>
      </form>

      {/* Display Debugged Response */}
      {debugResponse && (
        <div className="response">
          <pre>
            <code>{debugResponse}</code>
          </pre>
          <button
            onClick={() => {
              navigator.clipboard.writeText(debugResponse);
              alert('Debugged code copied to clipboard!');
            }}
            className="copy-button"
          >
            Copy Debugged Code
          </button>
        </div>
      )}
    </div>
  );
}

export default DebugPage;
