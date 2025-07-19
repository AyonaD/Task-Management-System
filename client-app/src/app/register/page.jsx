"use client";
import React ,{useState} from 'react'
import Link from 'next/link'
import Button from '../(components)/Button'
import Logo from '../(components)/Logo'
import Title from '../(components)/Title'
import api from '@/lib/axios';

function page() {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
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
      await api.get("/sanctum/csrf-cookie");

      const response = await api.post("/api/register", formData);
      console.log("User Registered:", response.data);

      // ✅ Redirect to login or dashboard
      window.location.href = "/login";
    } catch (err) {

      if (err.response) {
        setError(err.response.data.errors ? JSON.stringify(err.response.data.errors) : "Registration failed");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-screen p-8 pb-20  sm:p-20">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <div className="flex min-h-full flex-col justify-center px-2 py-12 lg:px-8">

          <div className="sm:mx-auto sm:w-full md:max-w-xl">
            <Logo alignment="justify-center" />

            <Title alignment="text-center" variant="primary" title="Sign Up Free and Streamline Your Task Management "></Title>

            
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full md:max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  for="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Name <span className='text-red-400'>*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    autocomplete="name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label
                  for="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address <span className='text-red-400'>*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    autocomplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>

              </div>

              <div>
                <div className="">
                  <label
                    for="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password <span className='text-red-400'>*</span>
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    autocomplete="current-password"
                    alue={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>

              </div>

              <div>
                <div className="">
                  <label
                    for="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Confirm Password <span className='text-red-400'>*</span>
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    required
                    autocomplete="current-password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
               
              <div>
                <Button type="submit" title={loading ? "Registering..." : "Register"} variant="primary" />
              </div>
            </form>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Already have an account?
              <Link href={'/login'} className="font-semibold text-indigo-600 hover:text-indigo-500">Log in</Link>
             
            </p>
          </div>

        </div>
        
      </main>
      
    </div>

    </>
  )
}

export default page