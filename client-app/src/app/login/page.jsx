import Image from "next/image";
import Button from "../(components)/Button";
import Link from "next/link";
import Title from "../(components)/Title";
import Logo from "../(components)/Logo";

function page() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex min-h-full flex-col justify-center px-2 py-12 lg:px-8">

          <div className="sm:mx-auto sm:w-full md:max-w-xl">
            <Logo/>

            <Title alignment="text-center" variant="primary" title="Manage your tasks efficiently with your personalized workspace"></Title>

            
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full md:max-w-lg">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  for="email"
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
                    autocomplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    for="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      class="font-semibold text-indigo-600 hover:text-indigo-500"
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
                    autocomplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <Button type="submit" title="Sign in" variant="primary" />
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