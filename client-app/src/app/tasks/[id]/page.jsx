"use client"
import React ,{useState, useEffect} from 'react';
import { useRouter, useParams } from "next/navigation";
import Header from '@/app/(components)/Header';
import Footer from '@/app/(components)/Footer';
import Sidebar from '@/app/(components)/Sidebar';
import api from '@/lib/axios';
import CommentForm from '@/app/(components)/CommentForm';
import CommentList from '@/app/(components)/CommentList';

const priorityLabels = {
  1: "Low",
  2: "Medium",
  3: "High",
};


function page() {

    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [activeTab, setActiveTab] = useState("comment");
    

    useEffect(() => {
        api.get(`/api/tasks/${id}`).then(res => setTask(res.data.task));
    }, [id]);

  if (!task) return null;
    
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
                    <h1>page ac</h1>
                    )}
                </div>

                
              </div>


            </div>

            <div className="pl-36">
              <div>
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
              </div>

              <div className='mt-4 bg-[#ebeef7] rounded-md'>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    
                    <tbody>
                      <tr className=" dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Assignee
                        </th>
                        <td className="px-6 py-4"> {task.assigned_user.name} </td>
                      </tr>

                      <tr className=" dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Due date
                        </th>
                        <td className="px-6 py-4">{task.due_date}</td>
                      </tr>

                      <tr className=" dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Priority
                        </th>
                        <td className="px-6 py-4"><span
                        className={`px-4 py-2 text-white text-xs rounded ${
                          task.priority === 1 ? "bg-blue-500" : ""
                        } ${
                          task.priority === 2 ? "bg-yellow-500 text-black" : ""
                        } ${task.priority === 3 ? "bg-purple-500" : ""}`}
                      >
                        {priorityLabels[task.priority]}
                      </span></td>
                      </tr>

                      <tr className=" dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Start Date
                        </th>
                        <td className="px-6 py-4">{task.start_date}</td>
                      </tr>

                      <tr className=" dark:bg-gray-800">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                         Time remaining
                        </th>
                        <td className="px-6 py-4">1</td>
                      </tr>
                    </tbody>
                    
                  </table>
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