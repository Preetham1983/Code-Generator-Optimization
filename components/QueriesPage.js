// QueriesPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './QueriesPage.css';

function QueriesPage() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/get-queries');
        setQueries(response.data);
      } catch (error) {
        console.error('Error fetching queries:', error);
      }
    };

    fetchQueries();
  }, []);

  
  return (
    <div className="queries-page">
      <header className="queries-header">
        <h1>Saved Queries</h1>
      </header>
      <div className="queries-list">
        {queries.length > 0 ? (
          queries.map((query) => (
            <div key={query._id} className="query-item">
              <div className="user-query">
                <h3>{query.userQuestion}</h3>
              </div>
              <pre><code>{query.response}</code></pre>
              <p><strong>Time Complexity:</strong> {query.timeComplexity}</p>
              <p><strong>Language:</strong> {query.language}</p>
              <p><strong>Timestamp:</strong> {new Date(query.timestamp).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No queries found.</p>
        )}
      </div>
    </div>
  );
  
}

export default QueriesPage;
