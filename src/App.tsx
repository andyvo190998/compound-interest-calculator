import React from 'react';
import './App.css';
import MainScreen from './components/mainScreen/MainScreen';

const App = () => {
  return (
    <div>
      <div className="app__background-top"></div>
      <div className="app__background-bottom"></div>
      <MainScreen />
    </div>
  );
};

export default App;
