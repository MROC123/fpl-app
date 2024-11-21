import Link from "next/link";
import React from "react";
// import "../css/global.ts";

export default function Header() {
  return (
    <div className="header">
      <Link href="/">Home</Link>
      <Link href="/list">List</Link>
      <Link href="/myteam">Your Team</Link>
    </div>
  );
}
