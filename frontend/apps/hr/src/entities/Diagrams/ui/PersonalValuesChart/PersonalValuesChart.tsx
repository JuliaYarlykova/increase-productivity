// Динамика личных ценностей, паутинчатая диаграмма балл

import 'chart.js/auto';
import type { ChartData, ChartOptions } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

import { getPersonalValues } from '../../model/api/graphicsApi';

const options: ChartOptions<'radar'> = {
  devicePixelRatio: 2,
  maintainAspectRatio: false,
  datasets: {
    radar: {
      fill: false,
      borderWidth: 4,
    },
  },
  plugins: {
    title: {
      align: 'start',
      text: 'Динамика ценностей',
      display: true,
      color: '#000',
      font: {
        size: 16,
      },
    },
    legend: {
      position: 'bottom',
      labels: {
        color: '#000',
        padding: 16,
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

const colors = ['#8A38F6', '#FF5C00', '#E56399', '#464D77', '#214E34'];

export function PersonalValuesChart() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  const { data } = getPersonalValues(id);

  if (!data || !data.datasets.length) return null;

  const formattedData: ChartData<'radar'> = {
    labels: data.labels,
    datasets: data.datasets.map((dataset, i) => ({
      label: dataset.label,
      data: dataset.data.map((data) => Number(data)),
      borderColor: colors[i],
      backgroundColor: colors[i],
    })),
  };

  return <Radar data={formattedData} options={options} />;
}
