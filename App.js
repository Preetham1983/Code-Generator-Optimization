


import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import QueriesPage from './components/QueriesPage'; // Import the new QueriesPage component
import DebugPage from './components/DebugPage'; // Import the DebugPage component
import OptimizePage from './components/OptimizePage';
import ReviewPage from './components/ReviewPage';
import InstructionsPage from './components/Instructions';
import Feedback from './components/Feedback';
import InterviewPrep  from './components/InterviewPrep';

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState('');
  const [imageResponse, setImageResponse] = useState('');
  const [timeComplexity, setTimeComplexity] = useState('O(n)'); // Default value for code generation
  const [language, setSelectedLanguage] = useState('java'); // Default value for code generation
  const [imageTimeComplexity, setImageTimeComplexity] = useState('O(n)'); // Default value for image
  const [imageLanguage, setImageSelectedLanguage] = useState('java'); // Default value for image
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    const data = {
      input_text: inputText,
      timeComplexity: timeComplexity, // Including time complexity
      language: language, // Including selected language
    };
    console.log('Submitting data:', data);
    try {
      const res = await axios.post('http://127.0.0.1:5001/generate', data); // Call Flask API
      setResponse(res.data.response);

      // Save query and response to MongoDB through your Node.js backend
      await axios.post('http://127.0.0.1:4000/save-query', {
        userQuestion: inputText,
        response: res.data.response,
        timeComplexity: timeComplexity,
        language: language,
      });
    } catch (error) {
      console.error('Error generating response:', error);
      console.error('Error details:', error.response);
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('timeComplexity', imageTimeComplexity); // Include time complexity for image
    formData.append('language', imageLanguage); // Include language for image

    try {
      const res = await axios.post('http://127.0.0.1:5001/image-to-text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageResponse(res.data.llama_response);

      // Save image response to MongoDB through your Node.js backend
      await axios.post('http://127.0.0.1:4000/save-query', {
        userQuestion: selectedImage,
        response: res.data.llama_response,
        timeComplexity: imageTimeComplexity,
        language: imageLanguage,
      });
    } catch (error) {
      console.error('Error processing image:', error);
      console.error('Error details:', error.response);
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Code Generator 🤖</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/queries">Saved Queries</Link> | <Link to="/debug">Debug Code</Link> | <Link to="/optimize">Optimization</Link> | <Link to="/review">Code Review</Link> <spam></spam>|<Link to="/interviewquestions">IntervPrep</Link>  |<Link to="/instructions">Instructions</Link>|
          </nav>
          


        </header>
        {/* <div className="rfm-marquee-container" style={{ background: 'rgb(195, 224, 229)', padding: '10px', fontSize: '16px', color: 'rgb(12, 45, 72)', fontWeight: 'bold', borderRadius: '5px' }}>
          <div className="rfm-marquee" style={{ animation: 'scroll-left 100s linear infinite' }}>
            🚨 Important Notice! 🚨 Only nominated individuals are eligible to enroll in the project. Please check the nominees on the group page or review your eligibility status on the dashboard to confirm if you can enroll.
            🚨 Important Notice! 🚨 Only nominated individuals are eligible to enroll in the project. Please check the nominees on the group page or review your eligibility status on the dashboard to confirm if you can enroll.
          </div>
        </div> */}
        


  

      {/* Loading spinner */}
      {loading && (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}

      <div className="form-container">
        <Routes>
          <Route path="/" element={
            <>
              <form onSubmit={handleSubmit} className="code-form">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter code description"
                />

                <select
                  value={timeComplexity}
                  onChange={(e) => setTimeComplexity(e.target.value)}
                >
                  <option value="O(1)">O(1) - Constant</option>
                  <option value="O(log n)">O(log n) - Logarithmic</option>
                  <option value="O(n)">O(n) - Linear</option>
                  <option value="O(n log n)">O(n log n) - Linearithmic</option>
                  <option value="O(n^2)">O(n^2) - Quadratic</option>
                  <option value="O(2^n)">O(2^n) - Exponential</option>
                </select>

                <select
                  value={language}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="c++">C++</option>
                  <option value="java">Java</option>
                  <option value="c">C</option>
                  <option value="c#">C#</option>
                  <option value="python">Python</option>
                  <option value="solidity">Solidity</option>
                  <option value="javascript">JavaScript</option>
                  <option value="ruby">Ruby</option>
                  <option value="go">Go</option>
                  <option value="swift">Swift</option>
                  <option value="typescript">TypeScript</option>
                </select>

                <button type="submit">Generate Code</button>
              </form>

              <form onSubmit={handleImageSubmit} className="image-form">
                <input
                  className="styled-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />

                <select
                  value={imageTimeComplexity}
                  onChange={(e) => setImageTimeComplexity(e.target.value)}
                >
                  <option value="O(1)">O(1) - Constant</option>
                  <option value="O(log n)">O(log n) - Logarithmic</option>
                  <option value="O(n)">O(n) - Linear</option>
                  <option value="O(n log n)">O(n log n) - Linearithmic</option>
                  <option value="O(n^2)">O(n^2) - Quadratic</option>
                  <option value="O(2^n)">O(2^n) - Exponential</option>
                </select>

                <select
                  value={imageLanguage}
                  onChange={(e) => setImageSelectedLanguage(e.target.value)}
                >
                  <option value="c++">C++</option>
                  <option value="java">Java</option>
                  <option value="c">C</option>
                  <option value="c#">C#</option>
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="ruby">Ruby</option>
                  <option value="solidity">Solidity</option>
                  <option value="go">Go</option>
                  <option value="swift">Swift</option>
                  <option value="typescript">TypeScript</option>
                </select>

                <button type="submit" className="styled-button2">Generate Image Code</button>
              </form>

              {response && (
                <div className="response">
                  <pre>
                    <code>{response}</code>
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(response);
                      alert('Code copied to clipboard!');
                    }}
                    className="copy-button"
                  >
                    Copy Code
                  </button>
                </div>
              )}

              {imageResponse && (
                <div className="response">
                  <pre>
                    <code>{imageResponse}</code>
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(imageResponse);
                      alert('Code copied to clipboard!');
                    }}
                    className="copy-button"
                  >
                    Copy Code
                  </button>
                </div>
              )}
            </>
          } />

          <Route path="/queries" element={<QueriesPage />} />
          <Route path="/debug" element={<DebugPage />} /> {/* New Debug Route */}
          <Route path="/optimize" element={<OptimizePage />} />
          <Route path="/review" element={<ReviewPage />} />

          <Route path="/feedback" element={<Feedback />} />
          <Route path="/instructions" element={<InstructionsPage />} />
          <Route path="//interviewquestions" element={<InterviewPrep/>}></Route>
        </Routes>
      </div>

      <footer className="App-footer">
        <p>© 2024 Code Generator</p>
        <Link to="/feedback">Feedback</Link>
      </footer>
    </div>
    </Router >
  );
}

export default App;
