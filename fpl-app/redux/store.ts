import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "./features/playersSlice";
import teamsReducer from "./features/teamsSlice";
import fplTeamReducer from "./features/fplTeamSlice";

export const store = configureStore({
  reducer: {
    players: playersReducer,
    teams: teamsReducer,
    fplTeam: fplTeamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
