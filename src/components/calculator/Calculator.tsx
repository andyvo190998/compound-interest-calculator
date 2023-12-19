import React, { ChangeEvent, FormEvent, useState } from 'react';
import './calculator.css';
import logo from '../../assets/logo.png';
import { Button, TextField, Typography } from '@mui/material';

const Calculator = () => {
  const [inputValues, setInputValues] = useState({
    initialDeposit: 0,
    monthlyContribution: 0,
    investmentLength: 1,
    annualInterest: 0,
  });
  const handleSubmit = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {
      initialDeposit,
      investmentLength,
      annualInterest,
      monthlyContribution,
    } = inputValues;

    const powerPart = Math.pow(
      1 + annualInterest / 100 / 1,
      1 * investmentLength
    );
    let futureValue = initialDeposit * powerPart;
    const contribution =
      initialDeposit + monthlyContribution * investmentLength * 12;
    let withMonthlyContribution = 0;
    if (monthlyContribution > 0) {
      withMonthlyContribution =
        (monthlyContribution * (powerPart - 1)) / (annualInterest / 100 / 1);
    }
    futureValue = futureValue + withMonthlyContribution * 12;
    console.log(Math.floor(futureValue), contribution);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: Number(value),
    }));
  };

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

        <form className="app__calculator-form_inputs" onSubmit={handleSubmit}>
          <TextField label="Compound Frequency" />
          <TextField label="Currency" />
          <TextField
            value={inputValues.initialDeposit}
            onChange={handleChange}
            label="initial deposit"
            name="initialDeposit"
            type="number"
          />
          <TextField
            value={inputValues.monthlyContribution}
            onChange={handleChange}
            label="Monthly Contribution"
            name="monthlyContribution"
            type="number"
          />
          <TextField
            value={inputValues.investmentLength}
            onChange={handleChange}
            label="Investment Length (year)"
            name="investmentLength"
          />
          <TextField
            value={inputValues.annualInterest}
            onChange={handleChange}
            label="Annual Interest Rate (Per Year)"
            name="annualInterest"
            type="number"
          />

          <Button
            sx={{ mt: 2, width: 'fit-content', marginLeft: 'auto' }}
            variant="contained"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Calculate
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Calculator;
