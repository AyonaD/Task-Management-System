"use client";
import React, { useEffect , useState } from "react";
import Button from "./Button";
import api from "@/lib/axios";

function CommentForm({ id }) {

    const [formData, setFormData] = useState({
        comment: "",
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
            `/api/tasks/${id}/comment`,
            formData
        );
        
        setFormData({
            comment: ""
        });

        } catch (err) {
        setError(err.response?.data?.message || "Failed to create comment");
        } finally {
        setLoading(false);
        }
    };


  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={12}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          ></textarea>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          title={loading ? "Submitting..." : "Comment"}
          variant="primary"
        />
      </form>
    </div>
  );
}

export default CommentForm;
