"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginScreen } from "@/components/auth/LoginScreen";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { user, isLoading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/home");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <main className="auth-loading" aria-label="Loading authentication" />;
  }

  if (user) {
    return null;
  }

  return <LoginScreen onLogin={login} />;
}
