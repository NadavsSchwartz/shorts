/* eslint-disable react/prop-types */
import React from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
} from '@mui/material';
// import LaptopMacIcon from '@mui/icons-material/LaptopMac';
// import PhoneIcon from '@mui/icons-material/Phone';
// import TabletIcon from '@mui/icons-material/Tablet';

export const TrafficByDevice = ({ AllLocations, ...props }) => {
  const theme = useTheme();

  console.log(AllLocations);

  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF',
      },
    ],
    labels: ['Desktop', 'Tablet', 'Mobile'],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: true,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 0.5,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card {...props}>
      <CardHeader title="Traffic by Location" />
      <Divider />
      <CardContent>
        <Box>
          <Doughnut data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};
export default TrafficByDevice;
