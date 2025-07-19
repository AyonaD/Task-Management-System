"use client";
import { createContext, useContext, useState, useEffect  } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import Loader from "@/app/(components)/Loader";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const router = useRouter();

   useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/user");
        setUser(res.data);
      } catch {
        setUser(null);
         router.replace("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);



  const login = (userData) => {
    setUser(userData); // Set user immediately after login
  };

  const logout = async () => {
    await api.post("/api/logout");
    setUser(null);
    setUser(null);
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader/>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
