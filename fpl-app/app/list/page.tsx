"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Listing() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("/api/fplPlayers")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.players);
        setTeams(data.teams);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching player data:", err));
  }, []);

  const teamName = (player) => {
    const team = teams.find((team) => team.id === player.team);
    return team ? team.name : "unknown team";
  };

  console.log(teams);
  console.log(players);

  return (
    <div>
      <Link href="/">Home</Link>
      <h1>Fantasy Premier League Players</h1>
      <h2>Teams</h2>
      <div>
        {teams.map((team) => (
          <p key={team.id}>{team.name}</p>
        ))}
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <ul>
          {players.map((player) => (
            <li key={player.id}>
              {player.first_name} {player.second_name} - {teamName(player)} -{" "}
              {player.now_cost / 10}M - {player.total_points} -
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
