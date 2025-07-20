"use client"
import React ,{useState, useEffect} from 'react';
import { useRouter, useParams } from "next/navigation";
import Header from '@/app/(components)/Header';
import Footer from '@/app/(components)/Footer';
import Sidebar from '@/app/(components)/Sidebar';
import api from '@/lib/axios';
import CommentForm from '@/app/(components)/CommentForm';
import CommentList from '@/app/(components)/CommentList';
import ActivityList from '@/app/(components)/ActivityList';
import TaskEdit from '@/app/(components)/TaskEdit';
import { useAuth } from "@/context/AuthContext";

const priorityLabels = {
  1: "Low",
  2: "Medium",
  3: "High",
};

const userRole = {
  1: "Admin",
  2: "Member"
};

function page() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [activeTab, setActiveTab] = useState("comment");
    const [status, setStatus] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        api.get(`/api/tasks/${id}`).then(res => {
            setTask(res.data.task)
            setStatus(res.data.task.status);
            console.log(res.data.task);
        });
    }, [id]);

    const handleStatusChange = async (e) => {
        const newStatus = Number(e.target.value);
        setStatus(newStatus); // update UI immediately

        try {
            await api.put(`/api/tasks/${task.id}`, { status: newStatus });

            const updated = await api.get(`/api/tasks/${task.id}`);
            setTask(updated.data.task);
        } catch (err) {
            console.error('Failed to update status', err);
            setStatus(task.status);
        }
     };


  if (!task) return null;
  
  const isAdmin = task.workpace?.members?.some(
    (member) => member.user_id === user?.id && member.role_id === 1
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 shadow-md rounded-md ml-6">
          <div className="px-12 py-6">
            <p className=" text-2xl font-semibold">{task.title}</p>
          </div>

          <div className="px-12 py-6 grid grid-cols-2 gap-6">
            <div className="">
              <p className=" text-md font-semibold mb-4">Description</p>

              <p className="text-sm mb-8"> {task.description} </p>

              <div className="">
                <p className=" text-md font-semibold mb-4">Activity</p>

                <div className="flex gap-6 border-b border-[#cfd3e3]  mb-4">
                    {["comment", "activity"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 text-sm font-medium ${
                        activeTab === tab
                            ? "border-b-2 border-purple-500 text-purple-600"
                            : "text-gray-500"
                        }`}
                    >
                        {tab === "comment"
                        ? "Comments"
                        : "Activity Log"}
                    </button>
                    ))}
                </div>

                <div className="mt-4">
                    {activeTab === "comment" && (

                     <>
                        <CommentForm id={task.id} />
                        <CommentList comments={task.comments} />   
                     </>

                    )}
                    {activeTab === "activity" && (
                        <ActivityList activiyLog={task.activity_logs} />
                    )}
                </div>

                
              </div>


            </div>

            <div className="pl-36">
              <div className='flex justify-between'>
                <select
                  className={`border rounded px-6 py-2 text-sm ${
                    task.status === 1
                      ? "bg-blue-300"
                      : task.status === 2
                      ? "bg-yellow-100"
                      : task.status === 3
                      ? "bg-green-300"
                      : task.status === 4
                      ? "bg-green-700 text-white"
                      : ""
                  }`}
                  value={task.status}
                  onChange={handleStatusChange}
                >
                  <option value="1" className="bg-blue-300">
                    Pending
                  </option>
                  <option value="2" className="bg-yellow-100">
                    To Do
                  </option>
                  <option value="3" className="bg-green-300">
                    In Progress
                  </option>
                  <option value="4" className="bg-green-700 text-white">
                    Done
                  </option>
                </select>

               {isAdmin && (
                  <div className="">
                    <button
                      className="py-2 px-4 ms-2 text-sm font-medium text-red-400 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      onClick={() => console.log("Delete logic here")}
                    >
                      Remove Task
                    </button>
                  </div>
                )}
              </div>

              <div className='mt-4 shadow p-6 rounded-md'>
                <div className="relative overflow-x-auto">
                    <TaskEdit task={task} members={task.workpace.members} onTaskUpdated={(updatedTask) => setTask(updatedTask)} />
                  
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default page