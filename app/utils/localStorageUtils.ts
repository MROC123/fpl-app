import { Player } from "../../redux/features/playersSlice";
import { setTeamFromLocalStorage } from "../../redux/features/fplTeamSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { FPLTeam } from "../../redux/features/fplTeamSlice";

export const syncFplTeamWithStats = (
  fetchedPlayers: Player[],
  dispatch: Dispatch
) => {
  const storedTeamString = localStorage.getItem("fplteam");

  if (!storedTeamString) return;

  const storedTeam: FPLTeam = JSON.parse(storedTeamString);

  const updatedTeam: FPLTeam = {
    ...storedTeam,
    ...Object.keys(storedTeam).reduce((acc, key) => {
      const existingPlayer = storedTeam[key as keyof FPLTeam] as Player;

      if (!existingPlayer) {
        return acc;
      }

      const updatedPlayer = fetchedPlayers.find(
        (p) => p.id === existingPlayer.id
      );

      return {
        ...acc,
        [key]: updatedPlayer
          ? { ...existingPlayer, ...updatedPlayer }
          : existingPlayer,
      };
    }, {} as Partial<FPLTeam>),
  };

  localStorage.setItem("fplteam", JSON.stringify(updatedTeam));
  dispatch(setTeamFromLocalStorage(updatedTeam));
};
