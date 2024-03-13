import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { store } from './app/store'; // Adjust the import path as necessary
import reportWebVitals from './reportWebVitals';

// Use the createRoot API for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();