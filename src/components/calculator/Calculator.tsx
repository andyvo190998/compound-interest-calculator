import React from 'react';
import './calculator.css';
import logo from '../../assets/logo.png';
import { Button, TextField, Typography } from '@mui/material';

const Calculator = () => {
  return (
    <div className="app__calculator">
      <div className="app__calculator-img">
        <img src={logo} alt="logo img" />
      </div>

      <div className="app__calculator-form">
        <Typography variant="h5">Compound interest calculator</Typography>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
          perferendis molestias. Neque reiciendis ullam laboriosam corporis
        </p>

        <div className="app__calculator-form_inputs">
          <TextField label="initial deposit" />
          <TextField label="initial deposit" />
          <TextField label="initial deposit" />
          <TextField label="initial deposit" />
          <TextField label="initial deposit" />
          <TextField label="initial deposit" />
        </div>
        <Button
          sx={{ mt: 2, width: 'fit-content', marginLeft: 'auto' }}
          variant="contained"
        >
          Calculate
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
