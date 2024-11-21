"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setTeamFromLocalStorage } from "@/redux/features/fplTeamSlice";
import { AppProps } from "next/app";
import Header from "./layout/header";

export default function Home({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  const fplTeam = useSelector((state: RootState) => state.fplTeam);

  return (
    <div>
      <h2>FPL-App</h2>
    </div>
  );
}
