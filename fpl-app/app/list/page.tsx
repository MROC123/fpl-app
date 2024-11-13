"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Player } from "@/redux/features/playersSlice";
// import "../css/dashboard.css";

export default function Listing() {
  const { players } = useSelector((state: RootState) => state.players);
  const { teams } = useSelector((state: RootState) => state.teams);

  const teamName = (player: Player) => {
    const team = teams.find((team) => team.id === player.team);
    return team ? team.name : "unknown team";
  };

  return (
    <div>
      <Link href="/">Home</Link>
      <h1>Fantasy Premier League Players</h1>
      {/* <h2>Teams</h2>
      <div>
        {teams.map((team) => (
          <p key={team.id}>{team.name}</p>
        ))}
      </div> */}
      {
        <ul>
          {players.map((player) => (
            <li key={player.id}>
              <span className="player-name">
                {player.first_name} {player.second_name}
              </span>
              <span className="team-name">- {teamName(player)}</span>
              <span className="player-stats">
                <span className="cost">{player.now_cost / 10}M</span>
                <span className="points">{player.total_points} pts</span>
                <span className="goals">{player.goals_scored} Goals</span>
              </span>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
