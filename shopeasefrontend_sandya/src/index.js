import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import App_Sandya from './App_Sandya';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root

root.render(
  <React.StrictMode>
    <App_Sandya />
  </React.StrictMode>
);