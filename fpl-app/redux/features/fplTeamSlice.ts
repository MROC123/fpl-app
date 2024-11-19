import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "./playersSlice";
import { useState, useEffect } from "react";

export interface FPLTeam {
  id: number;
  goalkeeper1: Player | null;
  goalkeeper2: Player | null;
  defender1: Player | null;
  defender2: Player | null;
  defender3: Player | null;
  defender4: Player | null;
  defender5: Player | null;
  midfielder1: Player | null;
  midfielder2: Player | null;
  midfielder3: Player | null;
  midfielder4: Player | null;
  midfielder5: Player | null;
  forward1: Player | null;
  forward2: Player | null;
  forward3: Player | null;
}

const initialState: FPLTeam = {
  id: 1,
  goalkeeper1: null,
  goalkeeper2: null,
  defender1: null,
  defender2: null,
  defender3: null,
  defender4: null,
  defender5: null,
  midfielder1: null,
  midfielder2: null,
  midfielder3: null,
  midfielder4: null,
  midfielder5: null,
  forward1: null,
  forward2: null,
  forward3: null,
};

const loadTeamFromLocalStorage = (): FPLTeam => {
  if (typeof window !== "undefined") {
    const team = localStorage.getItem("fplteam");
    if (team) {
      return team ? JSON.parse(team) : { ...initialState };
    } else {
      const defaultTeam = { ...initialState };
      localStorage.setItem("fplteam", JSON.stringify(defaultTeam));
      return defaultTeam;
    }
  }
  return { ...initialState };
};

const saveTeamToLocalStorage = (team: FPLTeam) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("fplteam", JSON.stringify(team));
  }
};

const getPositionKey = (element_type: number): (keyof FPLTeam)[] => {
  switch (element_type) {
    case 1:
      return ["goalkeeper1", "goalkeeper2"];
    case 2:
      return ["defender1", "defender2", "defender3", "defender4", "defender5"];
    case 3:
      return [
        "midfielder1",
        "midfielder2",
        "midfielder3",
        "midfielder4",
        "midfielder5",
      ];
    case 4:
      return ["forward1", "forward2", "forward3"];
    default:
      return [];
  }
};

const fplTeamSlice = createSlice({
  name: "fplTeam",
  initialState: loadTeamFromLocalStorage(),
  reducers: {
    addPlayerToTeam: (state, action: PayloadAction<Player>) => {
      const player = action.payload;
      const positionKeys = getPositionKey(player.element_type);
      const availableSlot = positionKeys.find((key) => state[key] === null);
      if (availableSlot) {
        (state[availableSlot] as Player | null) = player;
        saveTeamToLocalStorage(state);
      } else {
        alert(
          "No available slots for this position. Please remove a player first."
        );
      }
    },
    removePlayerFromTeam: (state, action: PayloadAction<Player>) => {
      const player = action.payload;
      const positionKeys = getPositionKey(player.element_type);
      const occupiedSlot = positionKeys.find(
        (key) => state[key] !== null && (state[key] as Player)?.id === player.id
      );

      if (occupiedSlot) {
        (state[occupiedSlot] as Player | null) = null;
        saveTeamToLocalStorage(state);
      }
    },
  },
});

export const { addPlayerToTeam, removePlayerFromTeam } = fplTeamSlice.actions;
export default fplTeamSlice.reducer;
