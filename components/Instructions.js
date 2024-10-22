import React from 'react';
import './Instructions.css';

function Instructions() {
    return (
        <footer className="instructions-footer">
            <div className="instructions-content">
                <header className="instructions-header">
                    <h1>Welcome to Code Generator</h1>
                </header>
                <div className="instructions-description">
                    <p>
                        Code Generation and Optimization is a platform where you can generate, optimize, and review your own code. It also provides debugging tools to help identify and fix errors in your code. This website is designed to assist developers in improving code quality and efficiency in an easy and streamlined way.
                    </p>
                </div>
                <h2>Instructions</h2>
                <ul>
                    <li>Upload your image or enter a query(user desc) in the input box</li>
                    <li>Select time complexity and language for code generation.</li>
                    <li>Click "Generate Code" or "Generate Image Code" for output.</li>
                    <li>Check your saved queries in the "Saved Queries" section.</li>
                    <li>Use the Debug, Optimization, or Code Review tools if needed.</li>
                    <li>Use Code review for reviewing your code</li>
                    <li>Use Code optimization for the better version( optimized version)</li>
                    <li>Debugging is used to check your codes have any debugs or not</li>
                </ul>
                <h3>Notes</h3>
                <ul>
                    <li>Please ensure that the image you upload is supported (PDF, PNG, JPG).</li>
                    <li>Queries should be clear and precise to get the best possible output.</li>
                    <li>Processing time may vary depending on the complexity of your input.( Atleast it takes 2 -3 mins for the response)</li>
                    <li>Ensure a stable internet connection for smooth operation.</li>
                    <li>submit your feedback(:)</li>

                </ul>
            </div>
        </footer>
    );
}

export default Instructions;


