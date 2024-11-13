import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Team {
  id: number;
  name: string;
  strength_attack_away: number;
  strength_attack_home: number;
  strength_defence_away: number;
  strength_defence_home: number;
  strength_overall_away: number;
  strength_overall_home: number;
}

interface TeamsState {
  teams: Team[];
}

const initialState: TeamsState = {
  teams: [],
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<Team[]>) {
      state.teams = action.payload;
    },
  },
});

export const { setTeams } = teamsSlice.actions;
export default teamsSlice.reducer;
