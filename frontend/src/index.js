import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css'; // Optional: Add global styles here
import App from './App';

// Create a root for the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);