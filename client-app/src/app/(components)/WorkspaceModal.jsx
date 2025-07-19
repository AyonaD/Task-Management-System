"use client";
import React, { useState } from 'react'
import { FiX } from "react-icons/fi";
import api from '@/lib/axios';
import { useRouter } from "next/navigation";
import Button from './Button';

function WorkspaceModal({ isOpen, onClose, onCreate }) {
     
    const [formData, setFormData] = useState({ title: "" });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        setError("");

        try {
            // Create workspace API call
            const res = await api.post("/api/workspaces", formData);

            // Assuming response: { workspace: { id: 1, title: 'My Workspace' } }
            const workspaceId = res.data.workspace.id;

            // Redirect to workspace page
            router.push(`/workspace/${workspaceId}`);
            } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to create workspace");
            } finally {
            setLoading(false);
            }

    };

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#292f4cb3] bg-opacity-1 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Create Workspace</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Workspace Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter workspace title"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
              required
            />
          </div>
          {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                  {error}
                </div>
              )}

          <div className="flex justify-end gap-2">
           
           <Button
                  type="submit"
                  title={loading ? "Creating..." : "Create Workspace"}
                  variant="primary"
                />
          </div>
        </form>
      </div>
    </div>
  )
}

export default WorkspaceModal