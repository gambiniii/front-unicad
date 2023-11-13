import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from "react-router-dom";

import Header from './components/Header/header';
import Router from './routes';
import './App.css';
import GlobalSyles from './styles/GlobalSyles';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <GlobalSyles />
      <ToastContainer autoClose={3000} className="toast-container" />
    </BrowserRouter>
  );
}

export default App;
