import React, { useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { RootState } from "../../redux/store";
import { useSelector, useState } from "react-redux";
import { availableFields } from "../constants/columns";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const FplDataGraph = () => {
  const { fplTeam } = useSelector((state: RootState) => state.fplTeam);
  const { players } = useSelector((state: RootState) => state.players);

  const [xAxisField, setXAxisField] = useState("points");
  const [yAxisField, setYAxisField] = useState("minutes");

  const data = {
    datasets: [
      {
        label: "Player Data",
        data: players.map((player) => ({
          x: player[xAxisField],
          y: player[yAxisField],
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context) => {
            const { x, y } = context.raw as { x: number; y: number };
            return `${xAxisField}: ${x}, ${yAxisField}: ${y}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: availableFields.find((m) => m.value === xAxisField)?.label,
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: availableFields.find((m) => m.value === yAxisField)?.label,
        },
        beginAtZero: true,
      },
    },
  };

  const handleXAxisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setXAxisField(e.target.value);
  };

  const handleYAxisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYAxisField(e.target.value);
  };

  const chartData = players.map((player) => ({
    name: player.web_name,
    xValue: player[xAxisField],
    yValue: player[yAxisField],
  }));

  return (
    <div>
      {/* Dropdown for selecting X-axis */}
      <div>
        <label htmlFor="x-axis">X-Axis:</label>
        <select id="x-axis" value={xAxisField} onChange={handleXAxisChange}>
          {availableFields.map((metric) => (
            <option key={metric.value} value={metric.value}>
              {metric.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown for selecting Y-axis */}
      <div>
        <label htmlFor="y-axis">Y-Axis:</label>
        <select id="y-axis" value={yAxisField} onChange={e.target.value}>
          {availableFields.map((metric) => (
            <option key={metric.value} value={metric.value}>
              {metric.label}
            </option>
          ))}
        </select>
      </div>

      {/* Render the scatter chart */}
      <div style={{ width: "600px", height: "400px" }}>
        <Scatter data={data} options={options} />
      </div>
    </div>
  );
};

export default FplDataGraph;
