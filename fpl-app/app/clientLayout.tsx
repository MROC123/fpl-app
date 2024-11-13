"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import DataFetcher from "./components/DataFetcher";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <DataFetcher />
      {children}
    </Provider>
  );
}
