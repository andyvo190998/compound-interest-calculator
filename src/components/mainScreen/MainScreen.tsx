import React from 'react';
import './mainscreen.css';
import Navbar from '../navbar/Navbar';
import Calculator from '../calculator/Calculator';

const MainScreen = () => {
  return (
    <div className="app__mainScreen">
      <div className="app__mainScreen-top">
        <Navbar />
        <Calculator />
      </div>
      <div className="app__mainScreen-bottom"></div>
    </div>
  );
};

export default MainScreen;
