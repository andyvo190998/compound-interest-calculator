import React from 'react';
import './mainscreen.css';
import Navbar from '../navbar/Navbar';
import Calculator from '../calculator/Calculator';
import Chart from '../chart/Chart';

const MainScreen = () => {
  return (
    <div className="app__mainScreen">
      <div className="app__mainScreen-top">
        <Navbar />
        <Calculator />
      </div>
      <div className="app__mainScreen-bottom">
        <Chart />
      </div>
    </div>
  );
};

export default MainScreen;
