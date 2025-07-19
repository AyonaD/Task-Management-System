"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import Header from "@/app/(components)/Header";
import Footer from "@/app/(components)/Footer";
import Sidebar from "@/app/(components)/Sidebar";
import TaskList from "@/app/(components)/TaskList";
import KanbanBoard from "@/app/(components)/KanbanBoard";
import PeopleList from "@/app/(components)/PeopleList";
import { FiPlus  } from "react-icons/fi";
import RightSideModal from "@/app/(components)/RightSideModal";
import TaskForm from "@/app/(components)/TaskForm";

function page({ workspaceId }) {
  const { id } = useParams(); // Get workspace ID from URL
  const { user } = useAuth();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("tasks");
  const [statusFilter, setStatusFilter] = useState("all");
  const [assignedUserFilter, setAssignedUserFilter] = useState("all");
  const [members, setMembers] = useState([]);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchData  = async () => {
      try {
        // const res = await api.get(`/api/workspaces/${id}`);
        // setWorkspace(res.data.workspace);
        const [workspaceRes, membersRes, tasksRes] = await Promise.all([
          api.get(`/api/workspaces/${id}`),
          api.get(`/api/workspaces/${id}/members`),
          api.get(`/api/workspaces/${id}/tasks`)
        ]);
        setWorkspace(workspaceRes.data.workspace);
        setMembers(membersRes.data.members || []);
        setTaskList(tasksRes.data.tasks || []);

      } catch (err) {
        setError(err.response?.data?.message || "Failed to load workspace");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  

  const [isTaskModalOpen, setTaskModalOpen] = useState(false);

  const handleTaskCreated = (newTask) => {
    console.log("Task Created:", newTask);
    setTaskModalOpen(false);
    fetchTasks();
    // Refresh tasks list if needed
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/api/workspaces/${id}/tasks`);
      setTaskList(res.data.tasks || []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

    // Function to filter and group tasks by status
  const getFilteredGroupedTasks = () => {
    if (!taskList || typeof taskList !== "object") return {};

    const filteredGrouped = {};

    Object.entries(taskList).forEach(([status, tasks]) => {
      // If filtering by status, skip groups that don't match
      if (statusFilter !== "0" && statusFilter !== "all") {
        if (String(status) !== statusFilter) return;
      }

      // Filter by assigned user inside this group
      let filtered = tasks;
      if (assignedUserFilter !== "all") {
        filtered = filtered.filter(
          (task) => String(task.assigned_user_id) === String(assignedUserFilter)
        );
      }

      if (filtered.length > 0) {
        filteredGrouped[status] = filtered;
      }
    });

    // Sort groups by status key ascending
    const sortedGrouped = Object.keys(filteredGrouped)
      .sort((a, b) => Number(a) - Number(b))
      .reduce((obj, key) => {
        obj[key] = filteredGrouped[key];
        return obj;
      }, {});

    return sortedGrouped;
  };

  
  // Inside render just call the function:
  const filteredTasks = getFilteredGroupedTasks();

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 shadow-md rounded-md ml-6">
            <div className="px-12 py-6">
              <p className=" text-2xl font-semibold">
                {workspace?.title || "Workspace"}
              </p>
            </div>

            <div className="px-12 py-6">
              <div className="flex gap-6 border-b border-[#cfd3e3]  mb-4">
                {["tasks", "kanban", "people"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-sm font-medium ${
                      activeTab === tab
                        ? "border-b-2 border-purple-500 text-purple-600"
                        : "text-gray-500"
                    }`}
                  >
                    {tab === "tasks"
                      ? "Task List"
                      : tab === "kanban"
                      ? "Kanban View"
                      : "People"}
                  </button>
                ))}
              </div>

              {/* Filters (only for task/kanban view) */}
              {(activeTab === "tasks" || activeTab === "kanban") && (
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => setTaskModalOpen(true)}
                    className="px-6 py-2 bg-blue-600 rounded-md text-white text-sm flex gap-1"
                  >
                    <FiPlus className="size-5 group-focus:stroke-white" /> New
                    Task
                  </button>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded px-6 py-2 text-sm"
                  >
                    <option value="0">All Statuses</option>
                    <option value="1">Pending</option>
                    <option value="2">To Do</option>
                    <option value="3">In Progress</option>
                    <option value="4">Done</option>
                  </select>

                  <select
                    value={assignedUserFilter}
                    onChange={(e) => setAssignedUserFilter(e.target.value)}
                    className="border rounded px-6 py-2 text-sm"
                  >
                    <option value="all">All Users</option>
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Tab Content */}
              <div className="mt-4">
                {activeTab === "tasks" && (
                  <TaskList
                    workspaceId={id}
                    tasks={filteredTasks}
                    filters={{ status: statusFilter, user: assignedUserFilter }}
                  />
                )}
                {activeTab === "kanban" && (
                  <KanbanBoard
                    workspaceId={id}
                    tasks={filteredTasks}
                    filters={{ status: statusFilter, user: assignedUserFilter }}
                  />
                )}
                {activeTab === "people" && <PeopleList workspaceId={id} />}
              </div>

              <RightSideModal
                isOpen={isTaskModalOpen}
                onClose={() => setTaskModalOpen(false)}
                title="Create New Task"
              >
                <TaskForm
                  workspaceId={id}
                  members={members}
                  onTaskCreated={handleTaskCreated}
                />
              </RightSideModal>


            </div>
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default page;
