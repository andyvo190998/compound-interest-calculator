import { useContext, useState } from 'react';
import './calculator.css';
import logo from '../../assets/logo.png';
import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import { GlobalContext } from '../../provider/GlobalProvider.jsx';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import Help from '../helps/Helps.js';
// import MoneyInput from '@rschpdr/react-money-input';

const Calculator = () => {
  const validationSchema = yup.object({
    currency: yup.string('Select currency'),
    compound_frequency: yup.string('Select compound frequency'),
    // .required('Compound frequency required'),
    initial_deposit: yup.number('Type initial deposit'),
    monthly_contribution: yup.number('Type monthly contribution'),
    investmentLength: yup
      .number('Type investment length')
      .required('Investment length required'),
    annual_interest_rate: yup
      .number('Select annual interest rate')
      .required('Annual interest rate required'),
  });

  const compound_frequency = [
    { label: 'Annually' },
    // { label: 'Semiannually' },
    // { label: 'Quarterly' },
    // { label: 'Monthly' },
    // { label: 'Daily' },
  ];
  const currency = [{ label: 'USD' }, { label: 'EUR' }, { label: 'VND' }];

  const initialValues = {
    compound_frequency: { label: 'Annually' },
    currency: { label: 'EUR' },
    initial_deposit: 0,
    monthly_contribution: 0,
    investmentLength: 1,
    annual_interest_rate: 0,
  };

  const { setFutureValueArr } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);

  const handleSubmit = (props: {
    compound_frequency: { label: string };
    currency: { label: string };
    initial_deposit: number;
    monthly_contribution: number;
    investmentLength: number;
    annual_interest_rate: number;
  }) => {
    const {
      compound_frequency,
      currency,
      initial_deposit,
      monthly_contribution,
      investmentLength,
      annual_interest_rate,
    } = props;
    let testArr: unknown[] = [];
    let previousDeposit = 0;
    let totalContribution = 0;
    for (let i = 0; i <= investmentLength; i++) {
      const powerPart1 = Math.pow(1 + annual_interest_rate / 100 / 1, 1 * 1);
      const withMonthlyContribution =
        (monthly_contribution * (powerPart1 - 1)) /
        (annual_interest_rate / 100 / 1);
      if (i === 1) {
        previousDeposit =
          initial_deposit * powerPart1 + withMonthlyContribution * 12;
        totalContribution = initial_deposit + monthly_contribution * 1 * 12;
      } else {
        totalContribution = totalContribution + monthly_contribution * 1 * 12;

        previousDeposit =
          previousDeposit * powerPart1 + withMonthlyContribution * 12;
      }

      testArr = [
        ...testArr,
        {
          yearId: i,
          depositValue: i === 0 ? initial_deposit : totalContribution,
          futureValue: i === 0 ? initial_deposit : previousDeposit,
          currency: currency,
          compound_frequency: compound_frequency,
        },
      ];
    }
    setFutureValueArr(testArr);
  };

  return (
    <div className="app__calculator">
      <div className="app__calculator-img">
        <img src={logo} alt="logo img" />
      </div>

      <div className="app__calculator-form">
        <Typography variant="h5">Compound interest calculator</Typography>
        <p>
          Need help? 👉👉👉{' '}
          <span
            style={{
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(true)}
          >
            click here
          </span>
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {
            console.log('submit');
          }}
        >
          {(formik) => (
            <Form>
              <div className="app__calculator-form_inputs">
                <Autocomplete
                  disablePortal
                  id="compound_frequency"
                  value={formik.values.compound_frequency}
                  onChange={(e, newValue) => {
                    formik.setFieldValue('compound_frequency', newValue);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.compound_frequency &&
                    Boolean(formik.errors.compound_frequency)
                  }
                  helpertext={
                    formik.touched.compound_frequency &&
                    formik.errors.compound_frequency
                  }
                  options={compound_frequency}
                  renderInput={(params) => (
                    <TextField
                      type="text"
                      {...params}
                      label="Compound Frequency"
                    />
                  )}
                />
                <Autocomplete
                  disablePortal
                  id="currency"
                  // name="compound_frequency"
                  value={formik.values.currency}
                  onChange={(e, newValue) => {
                    formik.setFieldValue('currency', newValue);
                  }}
                  onBlur={formik.handleBlur}
                  error="false"
                  options={currency}
                  renderInput={(params) => (
                    <TextField type="text" {...params} label="Currency" />
                  )}
                />

                <TextField
                  // customInput={TextField}
                  id="initial_deposit"
                  name="initial_deposit"
                  value={formik.values.initial_deposit}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.initial_deposit &&
                    Boolean(formik.errors.initial_deposit)
                  }
                  helpertext={
                    formik.touched.initial_deposit &&
                    formik.errors.initial_deposit
                  }
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
                  helpertext={
                    formik.touched.monthly_contribution &&
                    formik.errors.monthly_contribution
                  }
                  // value={inputValues.monthlyContribution}
                  // onChange={handleChange}
                  label="Monthly Contribution"
                  type="number"
                />
                <TextField
                  id="investmentLength"
                  name="investmentLength"
                  value={formik.values.investmentLength}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.investmentLength &&
                    Boolean(formik.errors.investmentLength)
                  }
                  helpertext={
                    formik.touched.investmentLength &&
                    formik.errors.investmentLength
                  }
                  label="Investment Length (year)"
                  type="number"
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
                  helpertext={
                    formik.touched.annual_interest_rate &&
                    formik.errors.annual_interest_rate
                  }
                  label="Interest Rate (%)"
                  type="number"
                />
              </div>

              <Button
                sx={{ mt: 2, width: 'fit-content', marginLeft: 'auto' }}
                variant="contained"
                type="submit"
                onClick={() => handleSubmit(formik.values)}
              >
                Calculate
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <Help open={open} setOpen={setOpen} />
    </div>
  );
};

export default Calculator;
