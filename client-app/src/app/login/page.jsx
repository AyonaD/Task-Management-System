"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../(components)/Button";
import Link from "next/link";
import Title from "../(components)/Title";
import Logo from "../(components)/Logo";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function page() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const { user } = useAuth();
  
  if(user){
    router.replace("/");
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Get CSRF cookie
      await api.get("/sanctum/csrf-cookie");
      
      // Login request
      const res = await api.post("/api/login", formData);

      // Set global auth state
      login(res.data.user);

      router.push("/");
      // Redirect or save user info in context/state
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex min-h-full flex-col justify-center px-2 py-12 lg:px-8">

          <div className="sm:mx-auto sm:w-full md:max-w-xl">

            <Logo alignment="justify-center" />
            <Title alignment="text-center" variant="primary" title="Manage your tasks efficiently with your personalized workspace"></Title>

            
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full md:max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div>
                <Button type="submit" title={loading ? "Signing in..." : "Sign in"} variant="primary" />
              </div>
            </form>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?
              <Link href={'/register'} className="font-semibold text-indigo-600 hover:text-indigo-500">Create an Account </Link>
             
            </p>
          </div>

        </div>
        
      </main>
      
    </div>
  )
}

export default page