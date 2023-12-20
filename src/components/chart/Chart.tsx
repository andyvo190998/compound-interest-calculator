import { Box, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import './chart.css';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../provider/GlobalProvider.jsx';

const Chart = () => {
  const { futureValueArr } = useContext(GlobalContext);
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
  ];
  const [totalContribution, setTotalContribution] = useState([]);
  const [totalFutureValue, setTotalFutureValue] = useState([]);
  const [years, setYears] = useState([]);

  const [windowWidth, seWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    let yearsOfInvestment = [];
    let benefit = [];
    let contribution = [];
    futureValueArr.forEach((item) => {
      yearsOfInvestment = [...yearsOfInvestment, item.yearId];
      benefit = [...benefit, item.futureValue];
      contribution = [...contribution, item.depositValue];
    });
    setYears(yearsOfInvestment);
    setTotalFutureValue(benefit);
    setTotalContribution(contribution);
  }, [futureValueArr]);
  useEffect(() => {
    window.addEventListener('resize', () => seWindowWidth(window.innerWidth));
  }, []);
  return (
    <Box className="app__chart-container">
      <Box className="app__chart-container_chart">
        <Typography>In 10 years, you will save $41,073</Typography>
        <LineChart
          width={
            windowWidth > 1100
              ? 500
              : windowWidth >= 550 && windowWidth <= 1100
              ? 400
              : 300
          }
          height={300}
          series={[
            { data: totalFutureValue, label: 'Future Value' },
            { data: totalContribution, label: 'Total Contribution' },
          ]}
          xAxis={[{ scaleType: 'point', data: years }]}
        />
      </Box>

      <Box className="app__chart-container_desc">
        <Typography sx={{ mb: 2 }}>Your savings:</Typography>
        <Box className="app__chart-container_desc-detail">
          <Box className="app__chart-container_label">
            <Box className="app__chart-container_label-block">
              <div className="circle" />
              <div className="line" />
              <div className="circle" />
            </Box>

            <Box className="app__chart-container_label-block">
              <div className="circle-saving" />
              <div className="line-saving" />
              <div className="circle-saving" />
            </Box>
          </Box>
          <Box className="text-desc">
            <Typography>Total savings:</Typography>
            <Typography>Deposit value:</Typography>
            <Typography>Contribution:</Typography>
            <Typography>Total interest:</Typography>
          </Box>
          <Box className="text-value">
            <Typography>$41,000</Typography>
            <Typography>$41,000</Typography>
            <Typography>$41,000</Typography>
            <Typography>$41,000</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Chart;
