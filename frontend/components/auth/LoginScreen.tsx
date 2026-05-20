"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { api } from "@/lib/api";
import type { AuthUser } from "@/types";

type LoginScreenProps = {
  onLogin: (user: AuthUser, rememberUser: boolean) => void;
};

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("vikas@subherp.com");
  const [password, setPassword] = useState("vikas123");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const res = await api.login(email, password);
      onLogin(res.user, remember);
    } catch (err: any) {
      setError(err.message || "Use vikas@subherp.com and vikas123 for this demo.");
    }
  };

  return (
    <main className="login-shell">
      <section className="login-showcase">
        <div className="brand login-brand">Subherp</div>
        <p>Phase 1 HRMS</p>
        <h1>Secure access for daily HR operations.</h1>
        <div className="login-preview">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="login-card" aria-label="Login form">
        <div>
          <p>Welcome Back</p>
          <h2>Login to Dashboard</h2>
          <span>Use your HRMS credentials to continue.</span>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="vikas@subherp.com"
              type="email"
              value={email}
            />
          </label>
          <label>
            Password
            <input
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              type="password"
              value={password}
            />
          </label>
          <div className="login-options">
            <label>
              <input
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                type="checkbox"
              />
              Remember me
            </label>
            <button type="button">Forgot password?</button>
          </div>
          {error && <strong className="login-error">{error}</strong>}
          <button className="login-button" type="submit">
            Sign In
          </button>
        </form>
        <small className="login-hint">
          Demo credentials: vikas@subherp.com / vikas123
        </small>
      </section>
    </main>
  );
}
