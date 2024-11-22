"use client";

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
import { useSelector } from "react-redux";
import { availableFields } from "../constants/columns";
import Select from "react-select";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const FplDataGraph = () => {
  const { players } = useSelector((state: RootState) => state.players);

  const [xAxisField, setXAxisField] = useState("minutes");
  const [yAxisField, setYAxisField] = useState("points");
  const [selectedPlayerIds, setSelectePlayerIds] = useState<number[]>([]);
  const [filteredMetric, setFilteredMetric] = useState("total_points");

  const topPlayers = [...players].sort(
    (a, b) => b[filteredMetric] - a[filteredMetric]
  );

  const filteredPlayers = selectedPlayerIds.length
    ? players.filter((player) => selectedPlayerIds.include(player.id))
    : topPlayers;

  // const calculateAxisRange = (data: number[]) => {
  //   const min = Math.min(...data);
  //   const max = Math.max(...data);
  //   const buffer = (max - min) * 0.2;
  //   return {
  //     min: min - buffer,
  //     max: max - buffer,
  //   };
  // };

  const calculateAxisRange = (data, field) => {
    const values = data.map((player) => player[field]);
    const min = Math.min(...values);
    const max = Math.max(...values);

    // Add 10% buffer to the range
    const buffer = (max - min) * 0.2;
    return {
      min: min - buffer,
      max: max + buffer,
    };
  };

  const yAxisData = filteredPlayers.map((player) => player[xAxisField]);
  const xAxisData = filteredPlayers.map((player) => player[yAxisField]);

  const xAxisRange = calculateAxisRange(players, xAxisField);
  const yAxisRange = calculateAxisRange(players, yAxisField);

  // const chartData = players.map((player) => ({
  //   name: player.web_name,
  //   xValue: player[xAxisField],
  //   yValue: player[yAxisField],
  // }));

  const data = {
    datasets: [
      {
        label: "Player Data",
        data: filteredPlayers.map((player) => ({
          x: player[xAxisField],
          y: player[yAxisField],
          name: player.web_name,
          xName: availableFields.find((field) => field.value === xAxisField)
            ?.label,
          yName: availableFields.find((field) => field.value === yAxisField)
            ?.label,
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
            const { x, y, name } = context.raw as {
              x: number;
              y: number;
              name: string;
            };

            const xLabel =
              availableFields.find((field) => field.value === xAxisField)
                ?.label || "X";
            const yLabel =
              availableFields.find((field) => field.value === yAxisField)
                ?.label || "Y";
            return `${name} | ${xLabel}: ${x} | ${yLabel}: ${y}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: availableFields.find((field) => field.value === xAxisField)
            ?.label,
        },
        min: xAxisRange.min,
        max: xAxisRange.max,
      },
      y: {
        title: {
          display: true,
          text: availableFields.find((field) => field.value === yAxisField)
            ?.label,
        },
        min: yAxisRange.min,
        max: yAxisRange.max,
      },
    },
  };

  const PlayerOptions = players.map((player) => ({
    value: player.id,
    label: player.web_name,
  }));

  const handlePlayerSelection = (selected) => {
    setSelectePlayerIds(
      selected ? selected.map((option) => option.valuer) : []
    );
  };

  const metricOptions = availableFields.map((field) => ({
    value: field.value,
    label: field.label,
  }));

  const handleMetricChange = (selected) => {
    setFilteredMetric(selected.value);
  };

  const handleXAxisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setXAxisField(e.target.value);
  };

  const handleYAxisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYAxisField(e.target.value);
  };

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
        <select id="y-axis" value={yAxisField} onChange={handleYAxisChange}>
          {availableFields.map((metric) => (
            <option key={metric.value} value={metric.value}>
              {metric.label}
            </option>
          ))}
        </select>
      </div>

      {/* <div>
        <label>Select Players</label>
        <select
          isMulti
          options={PlayerOptions}
          onChange={handlePlayerSelection}
          placeholder="Slected Players..."
        />
      </div>

      <div>
        <label>Filter by Top Players:</label>
        <Select
          options={metricOptions}
          onChange={handleMetricChange}
          defaultValue={metricOptions.find(
            (option) => option.value === "total_points"
          )}
        />
      </div> */}

      {/* Render the scatter chart */}
      <div style={{ width: "1500px", height: "900px" }}>
        <Scatter data={data} options={options} />
      </div>
    </div>
  );
};

export default FplDataGraph;
