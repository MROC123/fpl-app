"use client";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Player } from "@/redux/features/playersSlice";
import { setPlayers } from "@/redux/features/playersSlice";
import "../css/dashboard.css";
import {
  addPlayerToTeam,
  removePlayerFromTeam,
} from "@/redux/features/fplTeamSlice";
import { columns } from "../constants/columns";

export default function MainDashboard() {
  const { players } = useSelector((state: RootState) => state.players);
  const { teams } = useSelector((state: RootState) => state.teams);
  const fplTeam = useSelector((state: RootState) => state.fplTeam);
  const dispatch = useDispatch();

  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(players);
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedPlayerId, setExpandedPlayerId] = useState<number | null>(null);

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (players.length > 0) {
      setFilteredPlayers(players);
    }
  }, [players]);

  const teamName = (player: Player) => {
    const team = teams.find((team) => team.id === player.team);
    return team ? team.name : "unknown team";
  };

  const togglePlayerDetails = (playerId: number) => {
    setExpandedPlayerId((prevId) => (prevId === playerId ? null : playerId));
  };

  const addPlayerToFPLTeam = (player: Player) => {
    dispatch(addPlayerToTeam(player));
  };

  const removePlayerFromFPLTeam = (player: Player) => {
    dispatch(removePlayerFromTeam(player));
  };

  const isPlayerInTeam = (player: Player) =>
    Object.values(fplTeam).some((teamPlayer) => teamPlayer?.id === player.id);

  const handleSearchChange = (e: React.ChangeEvent<HTMLElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedTeam(selectedValue);

    let updatedPlayers = [...players];

    if (selectedValue !== "all") {
      if (selectedValue === "Goalkeepers") {
        updatedPlayers = updatedPlayers.filter(
          (player) => player.element_type === 1
        );
      } else if (selectedValue === "Defenders") {
        updatedPlayers = updatedPlayers.filter(
          (player) => player.element_type === 2
        );
      } else if (selectedValue === "Midfielders") {
        updatedPlayers = updatedPlayers.filter(
          (player) => player.element_type === 3
        );
      } else if (selectedValue === "Forwards") {
        updatedPlayers = updatedPlayers.filter(
          (player) => player.element_type === 4
        );
      } else {
        updatedPlayers = updatedPlayers.filter(
          (player) => player.team === parseInt(selectedValue)
        );
      }
    }

    setFilteredPlayers(updatedPlayers);
  };

  const sortedAndFilteredPlayers = [...filteredPlayers].sort((a, b) => {
    if (!sortField) return 0;

    const valueA = a[sortField];
    const valueB = b[sortField];

    const numericValueA =
      typeof valueA === "string" && !isNaN(parseFloat(valueA))
        ? parseFloat(valueA)
        : valueA;
    const numericValueB =
      typeof valueB === "string" && !isNaN(parseFloat(valueB))
        ? parseFloat(valueB)
        : valueB;

    if (
      typeof numericValueA === "number" &&
      typeof numericValueB === "number"
    ) {
      return sortOrder === "asc"
        ? numericValueA - numericValueB
        : numericValueB - numericValueA;
    }

    if (
      typeof numericValueA === "string" &&
      typeof numericValueB === "string"
    ) {
      return sortOrder === "asc"
        ? numericValueA.localeCompare(numericValueB)
        : numericValueB.localeCompare(numericValueA);
    }

    return 0;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="dashboard">
      <h1>Fantasy Premier League Dashboard</h1>

      <div className="dashboard-controls">
        <input
          type="text"
          placeholder="Search Players"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <select value={selectedTeam} onChange={handleSelectChange}>
        <optgroup label="Global">
          <option value="all">All Players</option>
        </optgroup>
        <optgroup label="By Position">
          <option value="Goalkeepers">Goalkeepers</option>
          <option value="Defenders">Defenders</option>
          <option value="Midfielders">Midfielders</option>
          <option value="Forwards">Forwards</option>
        </optgroup>
        <optgroup label="By Team">
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </optgroup>
      </select>

      <div className="scrollable-container">
        <div className="player-list">
          <div className="headings">
            {columns.map(({ field, label }) => (
              <span key={field} onClick={() => handleSort(field)}>
                {label}{" "}
                {sortField === field && (sortOrder === "asc" ? "↓" : "↑")}
              </span>
            ))}
          </div>

          {sortedAndFilteredPlayers.map((player) => (
            <div key={player.id} className="player-row">
              <div
                className="player-summary"
                onClick={() => togglePlayerDetails(player.id)}
              >
                <span>
                  {player.first_name} {player.second_name}
                </span>
                <span>{teamName(player)}</span>
                <span>{player.now_cost / 10}M</span>
                <span>{player.total_points}</span>
                <span>{player.goals_scored}</span>
                <span>{player.assists}</span>
                <span>{player.minutes}</span>
                <span>{player.bonus}</span>
                <span>{player.influence}</span>
                <span>{player.creativity}</span>
                <span>{player.threat}</span>
                <span>{player.expected_goals}</span>
                <span>{player.expected_assists}</span>
                <span>{player.expected_goal_involvements}</span>
                <span>{player.expected_goals_conceded}</span>
              </div>
              {expandedPlayerId === player.id && (
                <div className="player-details">
                  <p>
                    Details about {player.first_name} {player.second_name}
                  </p>
                  <div>
                    {isPlayerInTeam(player) ? (
                      <button onClick={() => removePlayerFromFPLTeam(player)}>
                        Remove from Team
                      </button>
                    ) : (
                      <button onClick={() => addPlayerToFPLTeam(player)}>
                        Add to Team
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
