"use client";
import React from "react";
import { useRouter } from "next/navigation";

const statusLabels = {
  1: "Pending",
  2: "To Do",
  3: "In Progress",
  4: "Done",
};

const priorityLabels = {
  1: "Low",
  2: "Medium",
  3: "High",
};

function TaskList({ tasks }) {

  const router = useRouter();

  const handleRowClick = (taskId) => {
    // Navigate to task details page, adjust URL as per your routing
    router.push(`/tasks/${taskId}`);
  };
    
  return (
    <div>
      {Object.entries(tasks).map(([status, taskList]) => (
        <div key={status} className="mb-10">
          <h2 className="text-lg font-semibold mb-4">{statusLabels[status]}</h2>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 w-3/6">
                    Task
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/6">
                    Assignee
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/6">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/6">
                    Due Date
                  </th>
                  
                </tr>
              </thead>
              <tbody>
                {taskList.map((task) => (
                  <tr key={task.id} className="bg-white dark:bg-gray-800 cursor-pointer" onClick={() => handleRowClick(task.id)}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {task.title}
                    </th>
                    <td className="px-6 py-4">{task.assigned_user?.name}</td>
                    <td className={`px-6 py-4 `}>
                      <span
                        className={`px-4 py-2 text-white text-xs rounded ${
                          task.priority === 1 ? "bg-blue-500" : ""
                        } ${
                          task.priority === 2 ? "bg-yellow-500 text-black" : ""
                        } ${task.priority === 3 ? "bg-purple-500" : ""}`}
                      >
                        {priorityLabels[task.priority]}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 ${
                        new Date(task.due_date) <=
                        new Date().setHours(0, 0, 0, 0) && task.status !=4
                          ? "text-red-600 font-semibold"
                          : ""
                      }`}
                    >
                      {task.due_date}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      {/* {filteredTasks.map(task => (
            <div key={task.id}>{task.title}</div>
        ))} */}
    </div>
  );
}

export default TaskList;
