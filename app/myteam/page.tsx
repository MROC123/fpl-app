"use client";
import Link from "next/link";
import React from "react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { Player } from "@/redux/features/playersSlice";
// import { setPlayers } from "@/redux/features/playersSlice";
// import "../css/dashboard.css";
import MainDashboard from "../components/mainDashboard";
import FootballPitch from "../components/footballPitch";
import FplDataBoard from "../components/fplTeamData";
import FplDataGraph from "../components/fplCharts";

export default function MyTeam() {
  // const { players } = useSelector((state: RootState) => state.players);
  // const { teams } = useSelector((state: RootState) => state.teams);
  // const dispatch = useDispatch();
  // const fplTeam = useSelector((state: RootState) => state.fplTeam);

  // const [expandedPlayerId, setExpandedPlayerId] = useState<number | null>(null);

  // const playerName = (player: Player) => {
  //   return player.first_name + " " + player.second_name.split(" ")[0];
  // };

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
    <div>
      <FplDataBoard></FplDataBoard>
      <FootballPitch></FootballPitch>
      <FplDataGraph />
      <MainDashboard />
    </div>
  );
}
