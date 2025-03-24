import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../index.css';

// Add global styles
const globalStyles = {
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
  lineHeight: 1.6,
  color: '#333'
};

// Apply global styles
Object.assign(document.body.style, globalStyles);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);