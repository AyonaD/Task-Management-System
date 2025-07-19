import React from "react";
import Logo from "./Logo";

function Header() {
  return (
    <header className="bg-[#ebeef7]  p-5 flex justify-between items-center">
      <Logo/>
      <div className="text-sm text-gray-700">
        Welcome, |
        <form action="" method="POST" className="inline">
          <button className="text-red-500 hover:underline">Logout</button>
        </form>
      </div>
    </header>
  );
}

export default Header;
