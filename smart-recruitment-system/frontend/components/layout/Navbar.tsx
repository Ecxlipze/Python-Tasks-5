"use client";

import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="text-xl font-semibold">
        Smart Recruitment System
      </h2>

      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer" size={20} />

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
          R
        </div>
      </div>
    </header>
  );
}