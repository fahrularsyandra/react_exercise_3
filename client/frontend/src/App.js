import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {Banner, NavbarMenu, MainContent} from './components/index';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <div className='page-container'>
    <div className='content-wrap'>

    <BrowserRouter>
      <div className="main-page container">
        <Banner/>
        <NavbarMenu/>
        <MainContent/>
        <div className='footer'>
        <Footer/>
        </div>
      </div>
    </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
