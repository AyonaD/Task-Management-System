"use client";
import { createContext, useContext, useState, useEffect  } from "react";
import api from "@/lib/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading state

   useEffect(() => {
    const fetchUser = async () => {
      try {
        await api.get('/sanctum/csrf-cookie');

        const res = await api.get("/api/user");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);



  const login = (userData) => {
    setUser(userData); // Set user immediately after login
  };

  const logout = async () => {
    await api.post("/api/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
