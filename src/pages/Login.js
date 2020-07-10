import React, { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="App w-screen h-screen bg-gray-300 absolute">
      <div className="flex justify-center h-full md:h-auto">
        <div className=" md:mt-16 lg:mt-24 md:rounded-md lg:rounded-lg bg-white shadow md:shadow-md lg:shadow-lg w-full md:w-1/2 lg:w-1/3 overflow-hidden">
          <div className="px-2 py-2 lg:px-4 lg:py-4 bg-purple-600 text-center">
            <h2 className="ml-8 mr-8 lg:ml-12 lg:mr-12 text-white text-xl md:text-xl lg:text-2xl">
              Login
            </h2>
          </div>
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col md:block h-full md:h-auto justify-between">
            <div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Username
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  Password
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="********"
                />
              </div>
              <div class="flex items-center justify-center">
                <button
                  class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
