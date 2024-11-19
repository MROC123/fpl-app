"use client";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Player } from "@/redux/features/playersSlice";
import { setPlayers } from "@/redux/features/playersSlice";
import "../css/dashboard.css";
import MainDashboard from "../components/mainDashboard";
import FootballPitch from "../components/footballPitch";

export default function MyTeam() {
  const { players } = useSelector((state: RootState) => state.players);
  const { teams } = useSelector((state: RootState) => state.teams);
  const dispatch = useDispatch();
  const fplTeam = useSelector((state: RootState) => state.fplTeam);

  const [expandedPlayerId, setExpandedPlayerId] = useState<number | null>(null);

  const playerName = (player: Player) => {
    return player.first_name + " " + player.second_name.split(" ")[0];
  };

  // const togglePlayerDetails = (playerId: number) => {
  //   setExpandedPlayerId((prevId) => (prevId === playerId ? null : playerId));
  // };

  // const findHighest = (field: string) => {
  //   const sortedPlayers = [...players].sort((a, b) => b[field] - a[field]);
  //   dispatch(setPlayers(sortedPlayers));
  // };

  // // const addToTeam = (player: Player) => {
  // //   if (createTeam.includes(player)) {
  // //     return null;
  // //   } else {
  // //     setCreateTeam((prevTeam) => [...prevTeam, player]);
  // //   }
  // // };

  // // const removeFromTeam = (playerID: number) => {
  // //   setCreateTeam((prevTeam) =>
  // //     prevTeam.filter((player) => playerID !== player.id)
  // //   );
  // // };

  return (
    <div className="my-team">
      <h2>My Team</h2>
      <FootballPitch></FootballPitch>
      <div className="football-pitch">
        <div className="football-pitch-goalkeepers">
          <span className="football-pitch-goalkeepers-card">
            {fplTeam.goalkeeper1
              ? [playerName(fplTeam.goalkeeper1)]
              : "goalkeeper1"}
          </span>
          <span className="football-pitch-goalkeepers-card">goalkeeper2</span>
        </div>
        <div className="football-pitch-defenders">
          <span className="football-pitch-defenders-card">defender1</span>
          <span className="football-pitch-defenders-card">defender2</span>
          <span className="football-pitch-defenders-card">defender3</span>
          <span className="football-pitch-defenders-card">defender4</span>
          <span className="football-pitch-defenders-card">defender5</span>
        </div>
        <div className="football-pitch-midfielders">
          <span className="football-pitch-midfielders-card">midfielder1</span>
          <span className="football-pitch-midfielders-card">midfielder2</span>
          <span className="football-pitch-midfielders-card">midfielder3</span>
          <span className="football-pitch-midfielders-card">midfielder4</span>
          <span className="football-pitch-midfielders-card">midfielder5</span>
        </div>
        <div className="football-pitch-forwards">
          <span className="football-pitch-forwards-card">forward1</span>
          <span className="football-pitch-forwards-card">forward2</span>
          <span className="football-pitch-forwards-card">forward3</span>
        </div>
      </div>
      <MainDashboard />
    </div>
  );
}
