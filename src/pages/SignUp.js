/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from '../utils/axios';
import { useHistory, Link } from 'react-router-dom';

export function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const history = useHistory();

  const handleSumbit = async (event) => {
    event.preventDefault();

    if (
      !username ||
      username.trim().length < 3 ||
      username.trim().length > 16
    ) {
      alert('username should be longer than 3 and shorter than 16');
      return;
    }

    if (!password || password.trim().length < 8) {
      alert('password should be longer than 8');
      return;
    }

    if (password !== rePassword) {
      alert('re-password should be equal to password');
      return;
    }

    try {
      await axios.post('/users', {
        username,
        password,
      });

      alert('sign up success');
      history.push('/');
    } catch (e) {
      if (e.response) {
        alert(e.response.data.message);
      } else {
        alert(e.message);
      }
    }
  };

  return (
    <div className="App w-screen h-screen bg-gray-300 absolute">
      <div className="flex justify-center h-full md:h-auto">
        <div className=" md:mt-16 lg:mt-24 md:rounded-md lg:rounded-lg bg-white shadow md:shadow-md lg:shadow-lg w-full md:w-1/2 lg:w-1/3 overflow-hidden">
          <div className="px-2 py-2 lg:px-4 lg:py-4 bg-purple-600 text-center">
            <h2 className="ml-8 mr-8 lg:ml-12 lg:mr-12 text-white text-xl md:text-xl lg:text-2xl">
              Sign up
            </h2>
          </div>
          <form
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col md:block h-full md:h-auto"
            onSubmit={handleSumbit}
          >
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div class="mb-4">
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Re-Password
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="********"
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Continue
              </button>
              <Link to="/">
                <a className="text-base text-purple-500 hover:text-purple-800">
                  Back to main
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
