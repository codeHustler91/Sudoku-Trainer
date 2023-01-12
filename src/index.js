import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCBldpWNnQ-aHamF31Vc_dhX2xeK5eFmTc",
  authDomain: "sudoku-trainer-bb6df.firebaseapp.com",
  projectId: "sudoku-trainer-bb6df",
  storageBucket: "sudoku-trainer-bb6df.appspot.com",
  messagingSenderId: "483940294369",
  appId: "1:483940294369:web:c63d6416ff7128364da1a0",
  measurementId: "G-ZLMZHN9VY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
