import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './components//App/App.jsx';
import { CurrentTemperatureUnitProvider } from './contexts/CurrentTemperatureUnitContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CurrentTemperatureUnitProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CurrentTemperatureUnitProvider>
  </React.StrictMode>,
)
