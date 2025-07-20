import React from "react";
import { useAuth } from "@/context/AuthContext";

const userRole = {
  1: "Admin",
  2: "Member"
};


function PeopleList({ members }) {
  const { user } = useAuth();

  const isAdmin = members.some(
    (member) => member.id === user.id && member.role_id === 1
  );


  console.log(user)
  return (
    <div className="grid grid-cols-6 gap-6">
      {members.map((member) => (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center py-5">
            <span className=" p-6 mb-3 rounded-full shadow-lg items-center"> {member.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase()}</span>
            <h5 className="mb-1 text-md font-medium text-gray-900 dark:text-white">
              {member.name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {userRole[member.role_id]}
            </span>
            {isAdmin && (
              <div className="flex mt-4 md:mt-6">
                <button
                  className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Remove
                </button>
              </div>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}

export default PeopleList;
