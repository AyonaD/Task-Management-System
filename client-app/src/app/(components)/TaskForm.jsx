"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import Button from "./Button";

function TaskForm({ workspaceId, members, onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: 1,          
    priority: 1,             
    start_date: "",
    due_date: "",            
    assigned_user_id: "",  
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post(
        `/api/workspaces/${workspaceId}/tasks`,
        formData
      );
      onTaskCreated(res.data.task);
      setFormData({
        title: "",
        description: "",
        status: 1,
        priority: 1,
        start_date: "",
        due_date: "",
        assigned_user_id: "",
      });

    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={12}
          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assignee
          </label>
          <select
            name="assigned_user_id"
            value={formData.assigned_user_id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            <option value="">Select Member</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}

          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            required
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        type="submit"
        title={loading ? "Creating..." : "Create Task"}
        variant="primary"
      />
    </form>
  );
}

export default TaskForm;
