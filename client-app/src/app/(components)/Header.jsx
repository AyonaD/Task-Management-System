"use client";
import React from "react";
import Logo from "./Logo";
import { useRouter } from "next/navigation";
import api from "@/lib/axios"; // your axios instance
import { useAuth } from "@/context/AuthContext";

function Header() {
  const router = useRouter();
  const { logout } = useAuth();

   const handleLogout = async (e) => {
    e.preventDefault();
    try {
      // Call API logout endpoint if exists
      await api.post("/api/logout");  

      // Clear auth context or token
      logout();  // from your AuthContext

      // Redirect to login page
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-[#ebeef7]  p-5 flex justify-between items-center">
      <Logo/>
      <div className="text-sm text-gray-700">
        Welcome, |
        <form onSubmit={handleLogout} className="inline">
          <button className="text-red-500 hover:underline">Logout</button>
        </form>
      </div>
    </header>
  );
}

export default Header;
