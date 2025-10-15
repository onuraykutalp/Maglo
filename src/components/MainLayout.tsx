import React from "react";
import Header from "./Header";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-screen">
    <Header />
    <main className="flex-1 w-screen h-screen overflow-y-auto">{children}</main>
  </div>
);

export default MainLayout;