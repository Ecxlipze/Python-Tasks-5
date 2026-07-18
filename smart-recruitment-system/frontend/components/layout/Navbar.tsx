"use client";

import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="flex h-auto items-center justify-between gap-3 border-b bg-white px-4 py-3 md:h-16 md:px-6">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu size={18} />
        </Button>

        <div className="relative w-full min-w-0 sm:w-80">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            placeholder="Search..."
            className="w-full rounded-lg border pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <Bell className="cursor-pointer" size={18} />

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-bold text-white md:h-10 md:w-10">
            R
          </div>

          <div className="hidden sm:block">
            <p className="font-semibold">Rohan</p>
            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
