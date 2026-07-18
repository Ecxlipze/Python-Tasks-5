"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 md:flex">

      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileOpenChange={setMobileSidebarOpen}
      />

      <div className="flex flex-1 flex-col">

        <Navbar onMenuClick={() => setMobileSidebarOpen(true)} />

        <main className="p-4 md:p-6">
          {children}
        </main>

      </div>

    </div>
  );
}
