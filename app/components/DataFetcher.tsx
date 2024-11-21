"use client";

import { setPlayers } from "@/redux/features/playersSlice";
import { useDispatch, useSelector } from "react-redux";
import { setTeams } from "@/redux/features/teamsSlice";

import { useEffect } from "react";

export default function DataFetcher() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fpl");
        const data = await response.json();
        dispatch(setPlayers(data.players));
        dispatch(setTeams(data.teams));
      } catch (error) {
        console.log("error with fetch", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return null;
}
