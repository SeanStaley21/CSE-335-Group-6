import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [{
    label: 'Stock Price',
    data: [120, 125, 123, 130, 128],
    borderColor: 'blue',
    fill: false,
  }]
};

function StockChart() {
  return (
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
      <h3>Stock Trend</h3>
      <Line data={data} />
    </div>
  );
}

export default StockChart;
