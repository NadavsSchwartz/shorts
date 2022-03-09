import React from 'react';
import 'chart.js/auto';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Box } from '@mui/material';

const data = [
  { date: 'Feb 12', value: 0 },
  { date: 'Feb 13', value: 1 },
  { date: 'Feb 14', value: 5 },
  { date: 'Feb 15', value: 11 },
  { date: 'Feb 16', value: 3 },
  { date: 'Feb 17', value: 2 },
];
const Stats = () => {
  return (
    <Box>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis />

        <LineSeries valueField="value" argumentField="date" />
      </Chart>
    </Box>
  );
};

export default Stats;
