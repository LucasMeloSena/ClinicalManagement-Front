import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useConsultationQueries } from "../../hooks/useConsultationQueries";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
);

const LineChart: React.FC = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const { consultations } = useConsultationQueries({});

  const groupByMonth = () => {
    let consultationsByMonth: number[] = Array(12).fill(0);
    consultations?.forEach((consultation) => {
      const month = new Date(consultation.startAt).getMonth();
      consultationsByMonth[month] += 1;
    });
    return consultationsByMonth;
  };

  const consultationData = useMemo(() => {
    return groupByMonth();
  }, [consultations]);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Consultas",
        data: consultationData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Consultas por mês",
      },
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Meses",
        },
      },
      y: {
        title: {
          display: true,
          text: "Consultas",
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
