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
  element_type: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bps: number;
  news: string;
  selected_by_percent: string;
  influence: string;
  creativity: string;
  threat: string;
  ict_index: string;
  starts: number;
  expected_goals: string;
  expected_assists: string;
  expected_goal_involvements: string;
  expected_goals_conceded: string;
  penalties_order: number | null;
  clean_sheets_per_90: number;
  form: string;
  web_name: string;
  points_per_game: string;
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
