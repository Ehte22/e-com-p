<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { Provider } from 'react-redux'
import reduxStore from './redux/store.ts'
=======
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import reduxStore from './redux/store.ts';
import { Provider } from 'react-redux';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root')!);
>>>>>>> b813c898b568045ca06a335e65933e0b28bc1ffc

root.render(
  <StrictMode>
    <Provider store={reduxStore}>
<<<<<<< HEAD
    <App />
    </Provider>
  </StrictMode>,
)
=======
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
>>>>>>> b813c898b568045ca06a335e65933e0b28bc1ffc
