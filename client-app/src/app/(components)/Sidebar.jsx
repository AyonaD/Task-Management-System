'use client'
import React,{useState, useEffect} from "react";
import Link from "next/link";
import { FiHome, FiList,FiPlus  } from "react-icons/fi";
import { MdWorkspaces } from "react-icons/md"; 
import WorkspaceModal from "./WorkspaceModal";
import api from "@/lib/axios";

function Sidebar() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCreateWorkspace = (title) => {
    console.log("Workspace Created:", title);
    // fetchWorkspaces();
  };

  const fetchWorkspaces = async () => {
    try {
      const res = await api.get("/api/workspaces");
      setWorkspaces(res.data.workspaces || []);
    } catch (err) {
      console.error("Failed to fetch workspaces", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);


  return (
    <aside>
      <div className="card w-72 bg-[#ebeef7] pl-5 min-h-screen">
        <ul className="w-full flex flex-col gap-1  bg-white shadow-md shadow-purple-200/50 rounded-md min-h-screen">
          <li className="flex-center cursor-pointer text-sm w-full whitespace-nowrap mt-3">
            <Link
              href={"/"}
              className=" items-center flex size-full gap-4 px-4 py-2 group  rounded-md bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
            >
              <FiHome className="size-5 group-focus:stroke-white" />
              Home
            </Link>
          </li>

          <li className="flex-center cursor-pointer text-sm  w-full whitespace-nowrap">
            <Link
              href={"/tasks"}
              className="flex size-full gap-4 px-4 py-2 group  rounded-md bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
            >
              <FiList className="size-5 group-focus:stroke-white" />
              My tasks
            </Link>
          </li>

          <li className="flex-center cursor-pointer text-sm  w-full whitespace-nowrap mb-3">
            <div className="flex justify-between items-center p-4">
              <span className="font-semibold text-sm">Workspaces</span>
              <button onClick={() => setModalOpen(true)} className="bg-[#ebeef7] p-2 rounded-full "><FiPlus className="size-5 group-focus:stroke-white" /></button>

              <WorkspaceModal
                  isOpen={isModalOpen}
                  onClose={() => setModalOpen(false)}
                  onCreate={handleCreateWorkspace}
                />
            </div>

            <ul>
              {workspaces.length > 0 ? (
                workspaces.map((ws) => (
                  <li key={ws.id}>
                    <Link
                      href={`/workspace/${ws.id}`}
                      className="flex size-full gap-4 px-4 py-2 group rounded-md bg-cover hover:bg-purple-100 hover:shadow-inner focus:bg-gradient-to-r from-purple-400 to-purple-600 focus:text-white text-gray-700 transition-all ease-linear"
                    >
                      <MdWorkspaces className="size-5 group-focus:stroke-white" />
                      {ws.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-4 text-gray-500 text-sm">No workspaces found</li>
              )}
            </ul>

          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
