"use client"
import React, { useEffect, useState } from 'react'
import Header from '../(components)/Header';
import Sidebar from "../(components)/Sidebar";
import Footer from "../(components)/Footer";
import { useAuth } from "@/context/AuthContext";
import api from '@/lib/axios';
import TaskList from '../(components)/TaskList';

function page() {
    const { user } = useAuth();
     const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    if (user?.id) {
      api
        .get(`/api/tasks/user/${user.id}`)
        .then((res) => {
          setTasks(res.data.tasks);
        })
        .catch((err) => {
          console.error("Failed to load tasks", err);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);


  return (
    <div class="flex flex-col min-h-screen">
        <Header />

        <div class="flex flex-1">
          <Sidebar />

          <main className="flex-1 shadow-md rounded-md ml-6">

            <div className="px-12 py-6">
              <span className="text-sm"></span>
              <p className="font-md font-semibold">Quickly access your recent boards and workspaces</p>
            </div>

            <div className='px-12 py-6'>
                <TaskList tasks={tasks}/>
            </div>
            


          </main>

        </div>

        <Footer />
      </div>
  )
}

export default page