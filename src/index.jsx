import React from 'react';
import ReactDOM from 'react-dom/client';
import { FinFlowProvider } from './context/FinFlowContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FinFlowProvider>
      <App />
    </FinFlowProvider>
  </React.StrictMode>
);
