"use client";
import React ,{useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import api from '@/lib/axios';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

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

const allStatuses = [1, 2, 3, 4];


function KanbanBoard({ tasks: initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const router = useRouter();

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleCardClick = (taskId) => {
    router.push(`/tasks/${taskId}`);
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const taskId = draggableId;
    const newStatus = parseInt(destination.droppableId);

    try {
      await api.put(`/api/tasks/${taskId}`, { status: newStatus });

     setTasks(prevTasks => {
        // Copy previous tasks object
        const newTasks = { ...prevTasks };

        // Find the task moved
        const taskIndex = newTasks[source.droppableId].findIndex(t => t.id.toString() === taskId);
        if (taskIndex === -1) return prevTasks; // task not found?

        // Remove task from old status list
        const [movedTask] = newTasks[source.droppableId].splice(taskIndex, 1);

        // Update task status
        movedTask.status = newStatus;

        // Add task to new status list
        if (!newTasks[newStatus]) newTasks[newStatus] = [];
        newTasks[newStatus] = [movedTask, ...newTasks[newStatus]];

        return newTasks;
      });

    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };


  return (
    
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-6">
        {allStatuses.map((status) => {
          const taskList = tasks[status] || [];

          return (
            <Droppable key={status} droppableId={status.toString()}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded-lg p-4 shadow-sm min-h-[300px]"
                >
                  {/* Column Header */}
                  <h2 className="text-lg font-semibold mb-4 text-center">
                    {statusLabels[status]}
                  </h2>

                  {/* Task Cards */}
                  <div className="space-y-4 min-h-[100px]">
                    {taskList.length === 0 && (
                      <p className="text-center text-gray-400 italic">
                        No tasks
                      </p>
                    )}

                    {taskList.map((task, index) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleCardClick(task.id)}
                            className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition"
                          >
                            {/* Task Title */}
                            <h3 className="font-semibold text-gray-800 text-sm mb-2">
                              {task.title}
                            </h3>

                            {/* Assignee */}
                            <p className="text-xs text-gray-600 mb-1">
                              <span className="font-medium">Assignee:</span>{" "}
                              {task.assigned_user?.name || "Unassigned"}
                            </p>

                            {/* Priority */}
                            <span
                              className={`inline-block px-2 py-1 text-xs rounded text-white ${
                                task.priority === 1
                                  ? "bg-blue-500"
                                  : task.priority === 2
                                  ? "bg-yellow-500 text-black"
                                  : "bg-purple-500"
                              }`}
                            >
                              {priorityLabels[task.priority]}
                            </span>

                            {/* Due Date */}
                            <p
                              className={`text-xs mt-2 ${
                                new Date(task.due_date) <=
                                  new Date().setHours(0, 0, 0, 0) &&
                                task.status !== 4
                                  ? "text-red-600 font-semibold"
                                  : "text-gray-500"
                              }`}
                            >
                              Due: {task.due_date}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  )
}

export default KanbanBoard