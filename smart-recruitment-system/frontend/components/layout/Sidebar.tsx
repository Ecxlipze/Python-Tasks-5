"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Brain,
  Settings,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const menuItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Jobs", href: "/jobs", icon: Briefcase },
  { title: "Candidates", href: "/candidates", icon: Users },
  { title: "Resumes", href: "/resumes", icon: FileText },
  { title: "AI Analysis", href: "/analysis", icon: Brain },
  { title: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

function SidebarContent() {
  const pathname = usePathname();

  return (
    <>
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold">RecruitAI</h1>
        <p className="text-sm text-slate-400">Smart Recruitment</p>
      </div>

      <nav className="mt-4 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 mb-2 transition ${
                active
                  ? "bg-blue-600"
                  : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export default function Sidebar({
  mobileOpen,
  onMobileOpenChange,
}: SidebarProps) {
  return (
    <>
      <aside className="hidden min-h-screen w-64 bg-slate-900 text-white md:block">
        <SidebarContent />
      </aside>

      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent side="left" className="w-[280px] bg-slate-900 p-0 text-white md:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
