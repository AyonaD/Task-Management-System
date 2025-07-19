"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import Header from "./(components)/Header";
import Sidebar from "./(components)/Sidebar";
import Footer from "./(components)/Footer";

function page() {
  const { user } = useAuth();

  if (!user) return null;

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Good morning";
    if (currentHour < 16) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      <div class="flex flex-col min-h-screen">
        <Header />

        <div class="flex flex-1">
          <Sidebar />

          <main className="flex-1 shadow-md rounded-md ml-6">

            <div className="px-12 py-6">
              <span className="text-sm">{getGreeting()}, {user?.name || "Guest"}!</span>
              <p className="font-md font-semibold">Quickly access your recent boards and workspaces</p>
            </div>


          </main>

        </div>

        <Footer />
      </div>
    </>
  );
}

export default page;
