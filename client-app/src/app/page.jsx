"use client"
import React from 'react'
import { useAuth } from "@/context/AuthContext";

function page() {

   const { user } = useAuth();

  if (!user) return null;

  return (
    <div>page</div>
  )
}

export default page