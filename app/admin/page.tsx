"use client";

import { useState } from "react";
import { AdminDashboard } from "@/components/admin-dashboard";

export default function Page() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password === "hellfire2026") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Wrong password. Try again.");
    }
  };

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card border border-border rounded-xl p-8 w-full max-w-sm flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Hell Fire Kitchen</p>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
