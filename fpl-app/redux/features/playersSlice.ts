import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  id: number;
  first_name: string;
  second_name: string;
  team: number;
  now_cost: number;
  total_points: number;
  goals_scored: number;
  minutes: number;
  assists: number;
  bonus: number;
}

interface PlayersState {
  players: Player[];
}

const initialState: PlayersState = {
  players: [],
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<Player[]>) {
      state.players = action.payload;
    },
  },
});

export const { setPlayers } = playersSlice.actions;
export default playersSlice.reducer;
