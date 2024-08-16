// Динамика личных метрик, линейная (балл/дата)

import 'chart.js/auto';
import type { ChartData, ChartOptions } from 'chart.js';
import { memo } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

import { getPersonalMetrics } from '../../model/api/graphicsApi';

const options: ChartOptions<'line'> = {
  devicePixelRatio: 2,
  maintainAspectRatio: false,
  datasets: {
    line: {
      borderWidth: 4,
    },
  },
  plugins: {
    title: {
      align: 'start',
      text: 'Динамика метрик',
      display: true,
      padding: 32,
      color: '#000',
      font: {
        size: 16,
      },
    },
    legend: {
      position: 'bottom',
      labels: {
        color: '#000',
        font: {
          size: 16,
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#000',
        font: {
          weight: 'bolder',
          size: 14,
        },
      },
    },
    y: {
      min: 0,
      max: 12,
      ticks: {
        stepSize: 1,
        color: '#000',
        font: {
          weight: 'bolder',
          size: 14,
        },
      },
    },
  },
  animation: false,
};

const colors = ['#8A38F6', '#FF5C00', '#E56399', '#464D77', '#214E34'];

export const PersonalMetricsChart = memo(() => {
  const { id } = useParams<{ id: string }>();

  if (!id) return null;
  const { data } = getPersonalMetrics(id);

  if (!data) return null;

  const formattedData: ChartData<'line'> = {
    labels: data.labels,
    datasets: data.datasets.map((dataset, i) => ({
      label: dataset.label,
      data: dataset.data.map((data) => Number(data)),
      borderColor: colors[i],
      backgroundColor: colors[i],
    })),
  };

  return <Line data={formattedData} options={options} height="100%" />;
});
