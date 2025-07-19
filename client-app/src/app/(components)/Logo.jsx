import React from "react";


function Logo({alignment}) {
  return (
    <>
      <div className={`${alignment} flex gap-2`}>
        <img
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
        className= {`h-6 w-auto`}
      />
        <h1 className= {`font-bold text-xl`}>Task Management</h1>

      </div>
      
    </>
  );
}

export default Logo;
