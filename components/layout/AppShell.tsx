import React from "react";
import { Header } from "./Header";

export interface AppShellProps {
  children?: React.ReactNode;
  className?: string;
}

export function AppShell({ children, className = "" }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F5] text-[#17211C]">
      <Header />
      <main className={`flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${className}`}>
        {children}
      </main>
    </div>
  );
}

export default AppShell;
