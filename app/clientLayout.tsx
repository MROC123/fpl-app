"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import DataFetcher from "./components/DataFetcher";
import LocalStorageCreater from "./components/localStorage";
import Header from "./layout/header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <DataFetcher />
      <LocalStorageCreater />
      <Header />

      {children}
    </Provider>
  );
}
