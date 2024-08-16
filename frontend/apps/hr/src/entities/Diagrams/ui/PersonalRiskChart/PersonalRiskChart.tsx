// Диаграмма личных рисков, руб
// Диаграмма рисков компании, круговая руб и %
import 'chart.js/auto';
import type { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

import { getPersonalRisks } from '../../model/api/graphicsApi';

const options: ChartOptions<'bar'> = {
  skipNull: true,
  indexAxis: 'y',
  maintainAspectRatio: false,
  devicePixelRatio: 2,
  datasets: {
    bar: {
      borderWidth: 2,
      borderRadius: 6,
    },
  },
  scales: {
    x: {
      ticks: {
        callback(tickValue) {
          if (typeof tickValue === 'number') {
            return Math.abs(tickValue);
          }
          return tickValue;
        },
      },
    },
    y: {
      display: false,
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label(tooltipItem) {
          const value =
            typeof tooltipItem.raw === 'number'
              ? `${Math.abs(tooltipItem.raw)} тыс.р`
              : `${tooltipItem.raw} тыс.р`;
          return `${tooltipItem.dataset.label}: ${value}`;
        },
      },
    },
    title: {
      align: 'start',
      text: 'Риски',
      display: true,
      color: '#000',
      font: {
        size: 18,
      },
    },
    legend: {
      position: 'bottom',
      labels: {
        padding: 16,
        color: '#000',
        font: {
          size: 16,
        },
      },
    },
  },
  animation: false,
};

export function PersonalRiskChart() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  const { data: risks, isLoading } = getPersonalRisks(id);
  if (!risks) return null;
  const data: ChartData<'bar'> = risks;
  return <Bar data={data} options={options} height="100%" />;
}
