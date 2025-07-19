"use client";
import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import Loader from '@/app/(components)/Loader';
import Header from '@/app/(components)/Header';
import Footer from '@/app/(components)/Footer';
import Sidebar from '@/app/(components)/Sidebar';

function page() {
 const { id } = useParams(); // Get workspace ID from URL
  const { user } = useAuth();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchWorkspace = async () => {
      try {
        const res = await api.get(`/api/workspaces/${id}`);
        setWorkspace(res.data.workspace);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load workspace");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspace();
  }, [id]);

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <>
      <div class="flex flex-col min-h-screen">
        <Header />

        <div class="flex flex-1">
          <Sidebar />

          <main className="flex-1 shadow-md rounded-md ml-6">

            <div className="px-12 py-6">
              <span className="text-sm">{workspace?.title || "Workspace"}</span>
              <p className="font-md font-semibold">Welcome, {user?.name || "Guest"}! This is your workspace.</p>
            </div>
            

          </main>

        </div>

        <Footer />
      </div>
    </>

    
  );
}

export default page