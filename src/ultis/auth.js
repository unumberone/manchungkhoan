// src/auth.js
import React, { createContext, useContext, useState } from "react";

const AuthCtx = createContext(null);

const FAKE_USERS = [
  { username: "demo",  password: "demo123",  role: "user"  },
  { username: "admin", password: "admin123", role: "admin" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("auth_user")) || null; }
    catch { return null; }
  });

  const login = async (username, password) => {
    const found = FAKE_USERS.find(u => u.username === username && u.password === password);
    if (!found) throw new Error("Sai tài khoản hoặc mật khẩu");
    const u = { username: found.username, role: found.role };
    setUser(u);
    localStorage.setItem("auth_user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
