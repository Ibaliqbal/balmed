import React from "react";
import Sidebar from "../sidebar";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid grid-cols-9 gap-4 w-full">
      <Sidebar />
      {children}
    </main>
  );
};

export default AppShell;
