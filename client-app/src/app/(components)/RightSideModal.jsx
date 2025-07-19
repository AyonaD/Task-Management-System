"use client";
import React from "react";
import { FiX } from "react-icons/fi";

function RightSideModal({ isOpen, onClose, children, title }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-[#292f4cb3] bg-opacity-40"
        onClick={onClose}
      ></div>

      {/* Right-Side Drawer */}
      <div
        className={`absolute top-0 right-0 w-2xl h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-[#cfd3e3]">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default RightSideModal;
