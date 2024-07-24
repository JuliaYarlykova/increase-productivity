// Динамика личных ценностей, паутинчатая диаграмма балл

import 'chart.js/auto';
import type { ChartData, ChartOptions } from 'chart.js';
import { Radar } from 'react-chartjs-2';

const data: ChartData<'radar'> = {
  labels: [
    'Ценность 1',
    'Ценность 2',
    'Ценность 3',
    'Ценность 4',
    'Ценность 5',
    'Ценность 6',
  ],
  datasets: [
    {
      label: '20.06.2024',
      data: [3, 4, 6, 2, 5, 8],
      borderColor: '#8A38F6',
      backgroundColor: '#8A38F6',
    },
    {
      label: '20.12.2024',
      data: [6, 1, 6, 7, 8, 5],
      borderColor: '#FF5C00',
      backgroundColor: '#FF5C00',
    },
    {
      label: '19.05.2025',
      data: [4, 5, 6, 6, 1, 2],
      borderColor: '#E56399',
      backgroundColor: '#E56399',
    },
  ],
};

const options: ChartOptions<'radar'> = {
  datasets: {
    radar: {
      fill: false,
      borderWidth: 4,
    },
  },
  plugins: {
    title: {
      align: 'start',
      text: 'Диаграмма по ценностям компании (усредненная по всем сотрудникам), паутинчатая, балл ценности округленный до целого',
      display: true,
      padding: 32,
      color: '#000',
      font: {
        size: 18,
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
    r: {
      pointLabels: {
        color: '#000',
        font: {
          weight: 'bolder',
          size: 14,
        },
      },
      min: 0,
      max: 10,
      ticks: {
        display: false,
      },
    },
  },
  animation: false,
};

export function PersonalValuesChart() {
  return <Radar data={data} options={options} />;
}
