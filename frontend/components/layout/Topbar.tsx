"use client";

import { useState } from "react";
import type { AuthUser } from "@/types";
import { useTheme } from "@/components/theme/ThemeProvider";

type TopbarProps = {
  onLogout: () => void;
  onToggleSidebar: () => void;
  user: AuthUser;
};

export function Topbar({ onLogout, onToggleSidebar, user }: TopbarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    setProfileOpen(false);
    onLogout();
  };

  return (
    <header className="topbar">
      <button className="menu-button" onClick={onToggleSidebar} aria-label="Toggle sidebar">
        <span />
        <span />
        <span />
      </button>
      <div className="top-actions" aria-label="Quick actions">
        <button
          aria-label="Toggle Theme"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          style={{ fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <div className="profile-menu">
          <button
            className="profile-pill"
            onClick={() => setProfileOpen((value) => !value)}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >
            <span>{user.displayName.charAt(0)}</span>
            {user.displayName} ▾
          </button>
          {profileOpen && (
            <div className="profile-dropdown" role="menu">
              <strong>{user.displayName}</strong>
              <small>{user.role}</small>
              <small>{user.email}</small>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
