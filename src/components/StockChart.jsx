import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [{
    label: 'Stock Price',
    data: [120, 125, 123, 130, 128],
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 3,
    pointBackgroundColor: '#3b82f6',
    pointBorderColor: '#1e40af',
    pointRadius: 5,
    pointHoverRadius: 7,
    fill: true,
    tension: 0.4
  }]
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: 'var(--text-primary)',
        font: {
          size: 14
        }
      }
    },
    title: {
      display: false
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'var(--text-primary)',
        font: {
          size: 12
        }
      },
      grid: {
        color: 'var(--border-color)',
        drawBorder: true
      }
    },
    y: {
      ticks: {
        color: 'var(--text-primary)',
        font: {
          size: 12
        }
      },
      grid: {
        color: 'var(--border-color)',
        drawBorder: true
      }
    }
  }
};

function StockChart() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '20px auto',
      padding: '20px',
      backgroundColor: 'var(--bg-card)',
      borderRadius: '12px',
      border: '1px solid var(--border-color)'
    }}>
      <h3 style={{ color: 'var(--text-primary)', marginTop: 0 }}>Stock Trend</h3>
      <Line data={data} options={options} />
    </div>
  );
}

export default StockChart;
