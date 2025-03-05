"use client";

import UserProvider from "@/components/context/UserContext";
import StoreProvider from "./StoreProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <StoreProvider>{children}</StoreProvider>
    </UserProvider>
  );
};

export default Providers;
