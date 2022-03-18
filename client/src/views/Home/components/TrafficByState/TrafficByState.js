/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { Box, useTheme } from '@mui/material';

export const TrafficByDevice = ({ AllLocations }) => {
  const theme = useTheme();
  const data = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#3F51B5',
          '#e53935',
          '#FB8C00',
          '#460943',
          '#c5b313',
          '#3b3332',
          '#1366c5',
          '#5113c5',
          '#c513c5',
        ],
        borderWidth: 3,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF',
      },
    ],
    labels: [],
  };
  let unique = {};

  const a = AllLocations && AllLocations;
  if (a) {
    a.forEach((linkData, index) => {
      if (!unique[a[index].country]) {
        unique[a[index].country] = 1;
      } else {
        unique[a[index].country]++;
      }
    });
  }

  unique &&
    Object.entries(unique).forEach(([key, value]) => {
      data.datasets[0].data.push(value), data.labels.push(key);
    });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'left',
      },
    },
  };

  return (
    <Box>
      <Doughnut data={data} options={options} width={100} type="doughnut" />{' '}
    </Box>
  );
};
export default TrafficByDevice;
