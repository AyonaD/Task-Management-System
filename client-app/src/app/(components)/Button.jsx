import React from "react";

function Button({type,title,variant}) {

    const baseStyles = "flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold";

    const variants = {
        primary: "bg-indigo-600  text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    };

  return (
    <button
      type={`${type}`} 
      className={`${baseStyles} ${variants[variant]}`}
    >
      {`${title}`}
    </button>
  );
}

export default Button;
