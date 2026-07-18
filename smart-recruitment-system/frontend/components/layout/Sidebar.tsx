"use client";

import Link from "next/link";
import { Briefcase, Users, FileText, Brain, Settings, LayoutDashboard } from "lucide-react";

const menuItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Jobs", href: "/jobs", icon: Briefcase },
  { title: "Candidates", href: "/candidates", icon: Users },
  { title: "Resumes", href: "/resumes", icon: FileText },
  { title: "AI Analysis", href: "/analysis", icon: Brain },
  { title: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-slate-900 text-white">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">RecruitAI</h1>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-slate-800"
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}