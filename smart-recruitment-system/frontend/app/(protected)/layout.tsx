"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import DashboardShell from "@/components/layout/DashboardShell";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { access } = useAuth();

  useEffect(() => {
    if (!access) {
      router.replace("/login");
    }
  }, [access, router]);

  if (!access) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm text-muted-foreground">
          Checking session...
        </p>
      </div>
    );
  }

  return <DashboardShell>{children}</DashboardShell>;
}
