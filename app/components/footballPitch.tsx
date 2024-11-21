"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Player } from "@/redux/features/playersSlice";
import { RootState } from "../../redux/store";
import { UseDispatch } from "react-redux";
import {
  addPlayerToTeam,
  removePlayerFromTeam,
  setTeamFromLocalStorage,
  clearTeam,
} from "@/redux/features/fplTeamSlice";
import Link from "next/link";

const FootballPitch = () => {
  const fplTeam = useSelector((state: RootState) => state.fplTeam);
  const dispatch = useDispatch();

  const removePlayerFromFPLTeam = (player: Player) => {
    dispatch(removePlayerFromTeam(player));
  };

  if (!fplTeam) {
    return <div>Loading your team...</div>;
  }

  const handleclearTeam = () => {
    dispatch(clearTeam());
  };

  return (
    <div>
      <div className="football-pitch-goalkeepers">
        <span className="football-pitch-goalkeepers-card">
          {fplTeam.goalkeeper1 ? fplTeam.goalkeeper1.web_name : "N/A"}
        </span>
        <span className="football-pitch-goalkeepers-card">
          {fplTeam.goalkeeper2 ? fplTeam.goalkeeper2.web_name : "N/A"}
        </span>
      </div>
      <div className="football-pitch-defenders">
        {["defender1", "defender2", "defender3", "defender4", "defender5"].map(
          (position) => (
            <span className="football-pitch-defenders-card" key={position}>
              {fplTeam[position] ? fplTeam[position].web_name : "N/A"}
            </span>
          )
        )}
      </div>
      <div className="football-pitch-midfielders">
        {[
          "midfielder1",
          "midfielder2",
          "midfielder3",
          "midfielder4",
          "midfielder5",
        ].map((position) => (
          <span className="football-pitch-midfielders-card" key={position}>
            {fplTeam[position] ? fplTeam[position].web_name : "N/A"}
          </span>
        ))}
      </div>
      <div className="football-pitch-forwards">
        {["forward1", "forward2", "forward3"].map((position) => (
          <span className="football-pitch-forwards-card" key={position}>
            {fplTeam[position] ? fplTeam[position].web_name : "N/A"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FootballPitch;
