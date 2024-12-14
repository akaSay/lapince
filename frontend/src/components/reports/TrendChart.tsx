import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Chart } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = "bar" | "line";

interface TrendChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  const { t } = useTranslation();

  // Calculer la moyenne mobile sur 3 mois
  const calculateMovingAverage = (values: number[], period: number = 3) => {
    return values.map((_, index) => {
      if (index < period - 1) return null;
      const slice = values.slice(index - (period - 1), index + 1);
      return slice.reduce((sum, val) => sum + val, 0) / period;
    });
  };

  const movingAverage = calculateMovingAverage(data.datasets[0].data);

  const chartData: ChartData<ChartType> = {
    labels: data.labels,
    datasets: [
      {
        type: "bar",
        label: t("reports.monthlyExpenses"),
        data: data.datasets[0].data,
        backgroundColor: "rgba(53, 162, 235, 0.3)",
        borderColor: "rgba(53, 162, 235, 0.8)",
        borderWidth: 1,
        borderRadius: 4,
        order: 2,
      },
      {
        type: "line",
        label: t("reports.trendLine"),
        data: movingAverage,
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
        order: 1,
        fill: false,
      },
    ],
  };

  const options: ChartOptions<ChartType> = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#fff",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
      title: {
        display: true,
        text: t("reports.charts.trend"),
        color: "#fff",
        padding: {
          top: 10,
          bottom: 30,
        },
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(26, 31, 46, 0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(53, 162, 235, 0.3)",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#fff",
          callback: function (value: any) {
            return new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }).format(value);
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "#fff",
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
};

export default TrendChart;
