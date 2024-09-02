import "./styles/main.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import  store  from './store/index';
import '@fortawesome/fontawesome-free/css/all.min.css';



const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// Affichage de l'application
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);