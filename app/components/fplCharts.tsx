"use client";

import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Player } from "@/redux/features/playersSlice";

import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { availableFields } from "../constants/columns";
import Select from "react-select";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const FplDataGraph = () => {
  const { players } = useSelector((state: RootState) => state.players);
  const fplTeam = useSelector((state: RootState) => state.fplTeam);
  const [xAxisField, setXAxisField] = useState("minutes");
  const [yAxisField, setYAxisField] = useState("total_points");
  const [filteredMetric, setFilteredMetric] = useState("total_points");

  const [playerFiltered, setPlayerFiltered] = useState([]);

  const [fplTeamPlayers, setFplTeamPlayers] = useState<Player[]>(players);

  const [playerSearchMetric, setPlayerSearchMetric] = useState("total_points");
  const [playerAmountMetric, setPlayerAmountMetric] = useState(players.length);
  const [firstOrLast, setFirstOrLast] = useState(true);
  const [playerPosition, setPlayerPosition] = useState(5);
  const [playerCost, setPlayerCost] = useState(Number(16));

  const [query, setQuery] = useState("");
  const [searchedPlayers, setSearchedPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [searchedPlayerPosition, setSearchedPlayerPosition] = useState(
    Number(5)
  );
  const [searchedAndFilteredPlayers, setSearchAndFilteredPlayers] = useState<
    Player[]
  >([]);

  const [fplPlayerPosition, setFplPlayerPosition] = useState(Number(5));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);
    const matches = players.filter(
      (player) =>
        player.web_name.toLowerCase().includes(input.toLowerCase()) ||
        player.second_name.toLowerCase().includes(input.toLowerCase()) ||
        player.first_name.toLowerCase().includes(input.toLowerCase())
    );
    setSearchedPlayers(matches);
  };

  const handleAddPlayer = (player: Player) => {
    setSelectedPlayers((prev) => {
      if (!prev.some((p) => p.id === player.id)) {
        return [...prev, player];
      }
      return prev;
    });

    setQuery("");
    setSearchedPlayers([]);
  };

  useEffect(() => {
    const searchedPlayerFilter =
      searchedPlayerPosition === 5
        ? selectedPlayers
        : selectedPlayers.filter(
            (player) => player.element_type === searchedPlayerPosition
          );

    setSearchAndFilteredPlayers(searchedPlayerFilter);
  }, [selectedPlayers, searchedPlayerPosition]);

  // useEffect(() => {
  //   const positionFiltered =
  //     searchedPlayerPosition === 5
  //       ? selectedPlayers
  //       : selectedPlayers.filter(
  //           (player) => player.element_type === searchedPlayerPosition
  //         );

  //   setSelectedPlayers(positionFiltered);
  // }, [selectedPlayers, searchedPlayerPosition]);

  const handleAmountOfPlayers = (e) => {
    setPlayerAmountMetric(Number(e.target.value));
  };

  const handlePlayerCost = (e) => {
    setPlayerCost(Number(e.target.value));
  };

  useEffect(() => {
    const positionFiltered =
      playerPosition === 5
        ? players
        : players.filter((player) => player.element_type === playerPosition);

    const positionAndCost = positionFiltered.filter(
      (player) => player.now_cost <= playerCost
    );

    const sortedPlayers = [...positionAndCost].sort((a, b) =>
      firstOrLast
        ? b[playerSearchMetric] - a[playerSearchMetric]
        : a[playerSearchMetric] - b[playerSearchMetric]
    );

    const finalFilteredPlayers = sortedPlayers.slice(0, playerAmountMetric);

    setPlayerFiltered(finalFilteredPlayers);
  }, [
    playerSearchMetric,
    playerAmountMetric,
    firstOrLast,
    playerPosition,
    playerCost,
    players,
  ]);

  // const filteredPlayers = selectedPlayerIds.length
  //   ? players.filter((player) => selectedPlayerIds.includes(player.id))
  //   : playerFiltered;

  useEffect(() => {
    const playersArray = Object.values(fplTeam).filter(
      (player): player is Player => player != null
    );

    const positionFiltered =
      fplPlayerPosition === 5
        ? playersArray
        : playersArray.filter(
            (player) => player.element_type === fplPlayerPosition
          );

    setFplTeamPlayers(positionFiltered);
  }, [fplTeam, fplPlayerPosition]);

  const calculateAxisRange = (data, field) => {
    const values = data.map((player) => player[field]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const buffer = (max - min) * 0.2;
    return {
      min: min - buffer,
      max: max + buffer,
    };
  };

  console.log(fplTeam);

  // const yAxisData = filteredPlayers.map((player) => player[xAxisField]);
  // const xAxisData = filteredPlayers.map((player) => player[yAxisField]);

  const xAxisRange = calculateAxisRange(players, xAxisField);
  const yAxisRange = calculateAxisRange(players, yAxisField);

  const data = {
    datasets: [
      {
        label: "Player Data",
        data: playerFiltered.map((player) => ({
          x: player[xAxisField],
          y: player[yAxisField],
          name: player.web_name,
          playerStat: player[playerSearchMetric] || "0",
          xName: availableFields.find((field) => field.value === xAxisField)
            ?.label,
          yName: availableFields.find((field) => field.value === yAxisField)
            ?.label,
        })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Your Fpl Team",
        data: fplTeamPlayers.map((player) => ({
          x: player[xAxisField],
          y: player[yAxisField],
          name: player.web_name,
          playerStat: player[playerSearchMetric] || "N/A",
          xName: availableFields.find((field) => field.value === xAxisField)
            ?.label,
          yName: availableFields.find((field) => field.value === yAxisField)
            ?.label,
        })),
        backgroundColor: "rgba(195, 34, 39, 0.8)",
      },
      {
        label: "Searched Players",
        data: searchedAndFilteredPlayers.map((player) => ({
          x: player[xAxisField],
          y: player[yAxisField],
          name: player.web_name,
          playerStat: player[playerSearchMetric] || "N/A",
          xName: availableFields.find((field) => field.value === xAxisField)
            ?.label,
          yName: availableFields.find((field) => field.value === yAxisField)
            ?.label,
        })),
        backgroundColor: "rgba(72, 255, 72, 1)",
      },
    ],
  };

  // console.log(fplTeam);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context) => {
            const { x, y, name, playerStat } = context.raw as {
              x: number;
              y: number;
              name: string;
              playerStat: number | string;
            };
            const searchedCatA =
              playerAmountMetric <= 201
                ? availableFields.find(
                    (field) => field.value === playerSearchMetric
                  )?.label
                : "";
            const xLabel =
              availableFields.find((field) => field.value === xAxisField)
                ?.label || "X";
            const yLabel =
              availableFields.find((field) => field.value === yAxisField)
                ?.label || "Y";

            return `${name} | ${xLabel}: ${x} | ${yLabel}: ${y} ${
              searchedCatA ? ` |  ${searchedCatA}: ${playerStat}` : ""
            }`;
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

  const handleXAxisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setXAxisField(e.target.value);
  };

  const handleYAxisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYAxisField(e.target.value);
  };

  return (
    <div>
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

      <div>
        <label>Player Positions</label>
        <select
          id="player-position"
          onChange={(e) => setPlayerPosition(Number(e.target.value))}
        >
          <option value={5}>All</option>
          <option value={1}>GoalKeeper</option>
          <option value={2}>Defender</option>
          <option value={3}>Midfielder</option>
          <option value={4}>Forward</option>
        </select>
      </div>

      <div>
        <label>Player Cost</label>
        <select id="player-cost" onChange={handlePlayerCost}>
          {Array.from({ length: Math.ceil((16 - 3.5) / 0.5) + 1 }, (_, i) => {
            const value = 16 - i * 0.5;
            return (
              <option key={value} value={value}>
                {value}m
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label>Amount of players</label>
        <select id="amount-of-players" onChange={handleAmountOfPlayers}>
          <option value={players.length}>All</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
        </select>
        {playerAmountMetric < 201 && (
          <div>
            <label>Amount</label>
            <select
              id="handleToporBottom"
              onChange={(e) => setFirstOrLast((prev) => !prev)}
            >
              <option>Top</option>
              <option>Bottom</option>
            </select>
            <div>
              <label htmlFor="amount-of-players-search">Player Category</label>
              <select
                id="amount-of-players-search"
                onChange={(e) => setPlayerSearchMetric(e.target.value)}
              >
                {availableFields.map((metric) => (
                  <option key={metric.value} value={metric.value}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div>
          <input
            placeholder="Add Player To Graph"
            type="text"
            value={query}
            onChange={(e) => handleSearch(e)}
          />
          <button onClick={(e) => setSelectedPlayers([])}>
            Clear Searched Players
          </button>
          {query && (
            <ul
              style={{
                border: "1px solid #ccc",
                maxHeight: "200px",
                maxWidth: "400px",
                overflowY: "auto",
                padding: "0",
              }}
            >
              {searchedPlayers.map((player) => (
                <li
                  key={player.id}
                  style={{
                    listStyle: "none",
                    padding: "8px",
                    cursor: "pointer",
                    backgroundColor: "#f9f9f9",
                    borderBottom: "1px solid #ddd",
                  }}
                  onClick={() => handleAddPlayer(player)} // Add player on click
                >
                  {player.web_name}
                </li>
              ))}
              {searchedPlayers.length === 0 && (
                <li style={{ padding: "8px" }}>No players found</li>
              )}
            </ul>
          )}
        </div>
      </div>

      <div>
        <label>FPL Team Positon Select</label>
        <select
          id="player-position"
          onChange={(e) => setFplPlayerPosition(Number(e.target.value))}
        >
          <option value={5}>All</option>
          <option value={1}>GoalKeeper</option>
          <option value={2}>Defender</option>
          <option value={3}>Midfielder</option>
          <option value={4}>Forward</option>
        </select>
      </div>

      <div>
        <label>Searched Players Positon Select</label>
        <select
          id="player-position"
          onChange={(e) => setSearchedPlayerPosition(Number(e.target.value))}
        >
          <option value={5}>All</option>
          <option value={1}>GoalKeeper</option>
          <option value={2}>Defender</option>
          <option value={3}>Midfielder</option>
          <option value={4}>Forward</option>
        </select>
      </div>
      {/* Render the scatter chart */}
      <div style={{ width: "1500px", height: "900px" }}>
        <Scatter data={data} options={options} />
      </div>
    </div>
  );
};

export default FplDataGraph;
