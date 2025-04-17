import React, { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

function ChartComponent({ summary }) {
  const chartRef = useRef(null);
  let chartInstance = null;

  const safeSummary = summary || {}; // Fallback to an empty object if summary is null or undefined

  useEffect(() => {
    // Destroy the previous chart instance to avoid conflicts
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'doughnut', // Specify the chart type
      data: {
        labels: Object.keys(safeSummary), // Categories
        datasets: [
          {
            data: Object.values(safeSummary), // Values
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Colors
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [safeSummary]);

  return <canvas ref={chartRef}></canvas>;
}

export default ChartComponent;