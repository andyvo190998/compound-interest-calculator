import { Box, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import './chart.css';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../provider/GlobalProvider.jsx';

const Chart = () => {
  const { futureValueArr } = useContext(GlobalContext);

  const [totalContribution, setTotalContribution] = useState([0]);
  const [totalFutureValue, setTotalFutureValue] = useState([0]);
  const [years, setYears] = useState([0]);
  const [windowWidth, seWindowWidth] = useState(window.innerWidth);

  const currencyFormat = (number: number) => {
    console.log(number);
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(number);
  };
  useEffect(() => {
    console.log(futureValueArr);
    if (futureValueArr.length !== 0) {
      let yearsOfInvestment = [];
      let benefit = [];
      let contribution = [];
      futureValueArr.forEach((item) => {
        yearsOfInvestment = [...yearsOfInvestment, item.yearId];
        benefit = [...benefit, item.futureValue];
        contribution = [...contribution, Math.round(item.depositValue)];
      });
      setYears(yearsOfInvestment);
      setTotalFutureValue(benefit);
      setTotalContribution(contribution);
    }
  }, [futureValueArr]);
  useEffect(() => {
    window.addEventListener('resize', () => seWindowWidth(window.innerWidth));
  }, []);
  return (
    <Box className="app__chart-container">
      <Box className="app__chart-container_chart">
        <Typography sx={{ textAlign: 'center' }}>
          In{' '}
          <span
            style={{
              color: 'white',
              padding: '0 5px',
              background: 'grey',
              borderRadius: '5px',
            }}
          >
            {years[years.length - 1]}
          </span>{' '}
          years, you will have{' '}
          <span
            style={{
              color: 'white',
              padding: '0 5px',
              background: 'grey',
              borderRadius: '5px',
            }}
          >
            {currencyFormat(totalFutureValue[totalFutureValue.length - 1])}
          </span>
        </Typography>
        <LineChart
          sx={{
            padding:
              totalFutureValue[totalFutureValue.length - 1] >= 100000000
                ? 2
                : 1,
          }}
          height={300}
          series={[
            { label: 'Future Value', curve: 'linear', data: totalFutureValue },
            {
              label: 'Total Investment',
              curve: 'linear',
              data: totalContribution,
            },
          ]}
          xAxis={[
            {
              scaleType: 'point',
              data: years,
              label: 'Investment Length (year)',
            },
          ]}
        />
      </Box>

      <Box className="app__chart-container_desc">
        <Typography sx={{ mb: 2 }}>Your savings:</Typography>
        <Box className="app__chart-container_desc-detail">
          <Box className="text-desc">
            <Typography>Future Value:</Typography>
            <Typography>Total Investment:</Typography>
            <Typography>Total Earn:</Typography>
            <Typography>Investment Length:</Typography>
          </Box>
          <Box className="text-value">
            <Typography>
              {currencyFormat(totalFutureValue[totalFutureValue.length - 1])}
            </Typography>
            <Typography>
              {currencyFormat(totalContribution[totalContribution.length - 1])}
            </Typography>
            <Typography>
              {currencyFormat(
                totalFutureValue[totalFutureValue.length - 1] -
                  totalContribution[totalContribution.length - 1]
              )}
            </Typography>
            <Typography>
              {years[years.length - 1]}{' '}
              {years[years.length - 1] > 1 ? 'years' : 'year'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chart;
