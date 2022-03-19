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

  if (AllLocations && AllLocations) {
    AllLocations.forEach((linkData, index) => {
      if (!unique[AllLocations[index].region]) {
        unique[AllLocations[index].region] = 1;
      } else {
        unique[AllLocations[index].region]++;
      }
    });
  }

  Object.keys(unique).length !== 0 &&
    Object.entries(unique && unique).forEach(([key, value]) => {
      data.datasets[0].data.push(value), data.labels.push(key);
    });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
