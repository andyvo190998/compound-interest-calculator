import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import './calculator.css';
import logo from '../../assets/logo.png';
import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import { GlobalContext } from '../../provider/GlobalProvider.jsx';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object({
  currency: yup.string('Select currency').required('Currency type required'),
  compound_frequency: yup
    .string('Select compound frequency')
    .required('Compound frequency required'),
  initial_deposit: yup.number('Type initial deposit'),
  monthly_contribution: yup.number('Type monthly contribution'),
  investment_length: yup
    .number('Type investment length')
    .required('Investment length required'),
  annual_interest_rate: yup
    .number('Select annual interest rate')
    .required('Annual interest rate required'),
});

const Calculator = () => {
  const formik = useFormik({
    initialValues: {
      currency: 'EUR',
      compound_frequency: 'Annually',
      initial_deposit: 0,
      monthly_contribution: 0,
      investment_length: 1,
      annual_interest_rate: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [inputValues, setInputValues] = useState({
    initialDeposit: 0,
    monthlyContribution: 0,
    investmentLength: 1,
    annualInterest: 0,
  });

  const { setFutureValueArr } = useContext(GlobalContext);

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
    let testArr = [];
    let previousDeposit = 0;
    let totalContribution = 0;
    for (let i = 0; i <= investmentLength; i++) {
      const powerPart1 = Math.pow(1 + annualInterest / 100 / 1, 1 * 1);
      const withMonthlyContribution =
        (monthlyContribution * (powerPart1 - 1)) / (annualInterest / 100 / 1);
      if (i === 1) {
        previousDeposit =
          initialDeposit * powerPart1 + withMonthlyContribution * 12;
        totalContribution = initialDeposit + monthlyContribution * 1 * 12;
      } else {
        totalContribution = totalContribution + monthlyContribution * 1 * 12;

        previousDeposit =
          previousDeposit * powerPart1 + withMonthlyContribution * 12;
      }

      testArr = [
        ...testArr,
        {
          yearId: i,
          depositValue: totalContribution,
          futureValue: previousDeposit,
        },
      ];
    }
    setFutureValueArr(testArr);

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

  const compound_frequency = [
    { label: 'Annually' },
    { label: 'Semiannually' },
    { label: 'Quarterly' },
    { label: 'Monthly' },
    { label: 'Daily' },
  ];

  const currency = [{ label: 'USD' }, { label: 'EUR' }, { label: 'VND' }];

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
          qweqwe
        </p>

        {/* <form className="app__calculator-form_inputs" onSubmit={handleSubmit}> */}
        <form onSubmit={formik.handleSubmit}>
          <div className="app__calculator-form_inputs">
            <Autocomplete
              disablePortal
              id="compound_frequency"
              // name="compound_frequency"
              value={formik.values.compound_frequency}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.compound_frequency &&
                Boolean(formik.errors.compound_frequency)
              }
              helperText={
                formik.touched.compound_frequency &&
                formik.errors.compound_frequency
              }
              options={compound_frequency}
              renderInput={(params) => (
                <TextField {...params} label="Compound Frequency" />
              )}
            />
            <Autocomplete
              disablePortal
              id="currency"
              // name="compound_frequency"
              value={formik.values.currency}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.currency && Boolean(formik.errors.currency)}
              helperText={formik.touched.currency && formik.errors.currency}
              options={currency}
              renderInput={(params) => (
                <TextField {...params} label="Currency" />
              )}
            />

            <TextField
              id="initial_deposit"
              name="initial_deposit"
              value={formik.values.initial_deposit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.initial_deposit &&
                Boolean(formik.errors.initial_deposit)
              }
              helperText={
                formik.touched.initial_deposit && formik.errors.initial_deposit
              }
              // value={inputValues.initialDeposit}
              // onChange={handleChange}
              label="initial deposit"
              type="number"
            />
            <TextField
              id="monthly_contribution"
              name="monthly_contribution"
              value={formik.values.monthly_contribution}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.monthly_contribution &&
                Boolean(formik.errors.monthly_contribution)
              }
              helperText={
                formik.touched.monthly_contribution &&
                formik.errors.monthly_contribution
              }
              // value={inputValues.monthlyContribution}
              // onChange={handleChange}
              label="Monthly Contribution"
              type="number"
            />
            <TextField
              id="investment_length"
              name="investment_length"
              value={formik.values.investment_length}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.investment_length &&
                Boolean(formik.errors.investment_length)
              }
              helperText={
                formik.touched.investment_length &&
                formik.errors.investment_length
              }
              // value={inputValues.investmentLength}
              // onChange={handleChange}
              label="Investment Length (year)"
              // name="investment_length"
            />
            <TextField
              id="annual_interest_rate"
              name="annual_interest_rate"
              value={formik.values.annual_interest_rate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.annual_interest_rate &&
                Boolean(formik.errors.annual_interest_rate)
              }
              helperText={
                formik.touched.annual_interest_rate &&
                formik.errors.annual_interest_rate
              }
              // value={inputValues.annualInterest}
              // onChange={handleChange}
              label="Annual Interest Rate (Per Year)"
              // name="annual_interest_rate"
              type="number"
            />
          </div>

          <Button
            sx={{ mt: 2, width: 'fit-content', marginLeft: 'auto' }}
            variant="contained"
            type="submit"
          >
            Calculate
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Calculator;
