import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Player } from "@/redux/features/playersSlice";
import { RootState } from "../../redux/store";
import { FPLTeam } from "@/redux/features/fplTeamSlice";
import { useState } from "react";
import { clearTeam } from "@/redux/features/fplTeamSlice";

export default function FplDataBoard() {
  const fplTeam = useSelector((state: RootState) => state.fplTeam);
  const [totalTeamCost, setTotalTeamCost] = useState(0);
  const dispatch = useDispatch();

  const findTotalTeam = (fplTeam: FPLTeam) => {
    const total = Object.values(fplTeam)
      .filter((player) => player !== null)
      .reduce((acc, player) => {
        if (player && typeof player.now_cost === "number") {
          return acc + player.now_cost;
        }
        return acc;
      }, 0);
    return total;
  };

  const handleClearTeam = () => {
    dispatch(clearTeam());
  };

  return (
    <div>
      <div>{<p>Total Cost: {findTotalTeam(fplTeam)}M</p>}</div>
      <div>
        <button onClick={handleClearTeam}>Clear Team</button>
      </div>
    </div>
  );
}
