import type { AuthUser } from "@/types";

const authStorageKey = "subherp-auth-user";
const sessionStorageKey = "subherp-session-user";

export function getStoredUser() {
  const savedUser =
    window.localStorage.getItem(authStorageKey) ??
    window.sessionStorage.getItem(sessionStorageKey);

  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser) as AuthUser;
  } catch {
    clearStoredUser();
    return null;
  }
}

export function storeUser(user: AuthUser, rememberUser: boolean) {
  const storage = rememberUser ? window.localStorage : window.sessionStorage;
  clearStoredUser();
  storage.setItem(rememberUser ? authStorageKey : sessionStorageKey, JSON.stringify(user));
}

export function clearStoredUser() {
  window.localStorage.removeItem(authStorageKey);
  window.sessionStorage.removeItem(sessionStorageKey);
}
