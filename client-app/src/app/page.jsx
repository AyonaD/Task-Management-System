"use client"; 

import Image from "next/image";
import Logo from "./(components)/Logo";
import Button from "./(components)/Button";
import Link from "next/link";
import Title from "./(components)/Title";
import withAuth from "./(components)/withAuth";

function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        
      </main>
      
    </div>
  );
}

export default withAuth(Home);
