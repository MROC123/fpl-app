"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTeamFromLocalStorage } from "@/redux/features/fplTeamSlice";
import { initialState } from "@/redux/features/fplTeamSlice";

export default function LocalStorageCreater() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTeam = localStorage.getItem("fplteam");

    if (storedTeam) {
      dispatch(setTeamFromLocalStorage(JSON.parse(storedTeam)));
    } else {
      localStorage.setItem("fplteam", JSON.stringify(initialState));
      dispatch(setTeamFromLocalStorage(initialState));
    }
  }, [dispatch]);

  return null;
}
