"use client";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Player } from "@/redux/features/playersSlice";
import { setPlayers } from "@/redux/features/playersSlice";
import "../css/dashboard.css";

export default function Listing() {
  const { players } = useSelector((state: RootState) => state.players);
  const { teams } = useSelector((state: RootState) => state.teams);
  const dispatch = useDispatch();

  const [expandedPlayerId, setExpandedPlayerId] = useState<number | null>(null);

  const teamName = (player: Player) => {
    const team = teams.find((team) => team.id === player.team);
    return team ? team.name : "unknown team";
  };

  const togglePlayerDetails = (playerId: number) => {
    setExpandedPlayerId((prevId) => (prevId === playerId ? null : playerId));
  };

  const findHighestPointsTotal = () => {
    const sortedPlayers = [...players].sort(
      (a, b) => a.total_points + b.total_points
    );
    dispatch(setPlayers(sortedPlayers));
  };

  const findHighest = (field: string) => {
    const sortedPlayers = [...players].sort((a, b) => b[field] - a[field]);
    dispatch(setPlayers(sortedPlayers));
  };

  return (
    <div className="dashboard">
      <h1>Fantasy Premier League Dashboard</h1>
      <div className="scrollable-container">
        <div className="player-list">
          <div className="headings">
            <span onClick={() => findHighest("second_name")}>Name</span>
            <span onClick={() => findHighest("team")}>Team</span>
            <span onClick={() => findHighest("now_cost")}>Cost</span>
            <span onClick={() => findHighest("total_points")}>
              Total Points
            </span>
            <span onClick={() => findHighest("goals_scored")}>
              Goals Scored
            </span>
            <span onClick={() => findHighest("assists")}>Assists</span>
            <span onClick={() => findHighest("minutes")}>Minutes</span>
            <span onClick={() => findHighest("bonus")}>Bonus Points</span>
            <span onClick={() => findHighest("influence")}>Influence</span>
            <span onClick={() => findHighest("creativity")}>Creativity</span>
            <span onClick={() => findHighest("threat")}>Threat</span>
            <span onClick={() => findHighest("expected_goals")}>
              Expected Goals
            </span>
            <span onClick={() => findHighest("expected_assists")}>
              Expected Assists
            </span>
            <span onClick={() => findHighest("expected_goal_involvements")}>
              Expected Goal Involvements
            </span>
            <span onClick={() => findHighest("expected_goals_conceded")}>
              Expected Goals Conceded
            </span>
            <span onClick={() => findHighest("penalties_order")}>
              Penalty Order
            </span>
          </div>
          {players.map((player) => (
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
                <span>{player.penalties_order}</span>
              </div>
              {expandedPlayerId === player.id && (
                <div className="player-details">
                  <p>
                    Details about {player.first_name} {player.second_name}
                  </p>
                  {/* You can add more detailed stats or info here */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
