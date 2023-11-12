import React from 'react';
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
    </BrowserRouter>
  );
}

export default App;
