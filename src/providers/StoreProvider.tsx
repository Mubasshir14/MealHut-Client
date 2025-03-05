/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { AppStore, makeStore } from "@/components/redux/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  const persistedStore = persistStore(storeRef.current);
  return <Provider store={storeRef.current}>{children}</Provider>;
}
