"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Player } from "@/redux/features/playersSlice";

interface PlayerCardProps {
  players: Player[];
}

export default function PlayerCard({ players }: PlayerCardProps) {
  const [playerCardData, setPlayerCardData] = useState<Player[]>([]);

  useEffect(() => {
    setPlayerCardData(players);
  }, [players]);

  const fetchFixtures = async (id: Number) => {
    try {
      const response = await fetch(
        `https://fantasy.premierleague.com/api/element-summary/${id}`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("error with fixture fetch", error);
    }
  };

  fetchFixtures(327);

  return (
    <div>
      {playerCardData.map((player) => (
        <div key={player.id}>
          <p>{player.first_name + " " + player.second_name}</p>
        </div>
      ))}
    </div>
  );
}
