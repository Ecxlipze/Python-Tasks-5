"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";

import PageHeader from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type ProfileSettings = {
  company_name: string;
  recruiter_name: string;
  email: string;
};

const defaultProfile: ProfileSettings = {
  company_name: "RecruitAI",
  recruiter_name: "Rohan",
  email: "rohan@example.com",
};

export default function SettingsPage() {
  const { logout } = useAuth();
  const [profile, setProfile] = useState<ProfileSettings>(() => {
    if (typeof window === "undefined") {
      return defaultProfile;
    }

    const savedProfile = localStorage.getItem("recruiter_profile");
    if (!savedProfile) {
      return defaultProfile;
    }

    try {
      return JSON.parse(savedProfile) as ProfileSettings;
    } catch {
      return defaultProfile;
    }
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  function handleProfileSave() {
    localStorage.setItem("recruiter_profile", JSON.stringify(profile));
    toast.success("Profile settings saved");
  }

  function handlePasswordUpdate() {
    if (!currentPassword || !newPassword) {
      toast.error("Fill in both password fields.");
      return;
    }

    toast.success("Password update request prepared");
    setCurrentPassword("");
    setNewPassword("");
  }

  function handleThemeChange(checked: boolean) {
    setDarkMode(checked);

    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your profile, security, and session"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your company and recruiter details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={profile.company_name}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    company_name: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recruiter_name">Recruiter Name</Label>
              <Input
                id="recruiter_name"
                value={profile.recruiter_name}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    recruiter_name: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(event) =>
                  setProfile((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </div>

            <Button onClick={handleProfileSave}>Save Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Change your password and manage appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current_password">Current Password</Label>
                <Input
                  id="current_password"
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new_password">New Password</Label>
                <Input
                  id="new_password"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
              </div>

              <Button variant="outline" onClick={handlePasswordUpdate}>
                Update Password
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Switch the dashboard appearance.
                </p>
              </div>
              <Switch checked={darkMode} onCheckedChange={handleThemeChange} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
          <CardDescription>End your current session securely</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
