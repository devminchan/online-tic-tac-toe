/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import { UserContext } from '../context/UserProvider';

export default function Setting() {
  const { userState } = useContext(UserContext);

  const handleLogout = async (event) => {
    localStorage.setItem('token', '');
    alert('Logout success!');
    window.location.href = '/';
  };

  const handleDelete = async (event) => {
    try {
      await axios.delete('/users/me');
      localStorage.setItem('token', '');
      alert('success to delete account');
      window.location.href = '/';
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <div className="App w-screen h-screen bg-gray-300 absolute">
      <div className="flex justify-center h-full md:h-auto">
        <div className=" md:mt-16 lg:mt-24 md:rounded-md lg:rounded-lg bg-white shadow md:shadow-md lg:shadow-lg w-full md:w-1/2 lg:w-1/3 overflow-hidden">
          <div className="px-2 py-2 lg:px-4 lg:py-4 bg-purple-600 text-center">
            <h2 className="ml-8 mr-8 lg:ml-12 lg:mr-12 text-white text-xl md:text-xl lg:text-2xl">
              Setting
            </h2>
          </div>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col md:block h-full md:h-auto">
            <div class="mb-8 md:mb-12 lg:mb-16">
              <div class="block text-gray-600 text-sm mb-2">Logged in as</div>
              <div class="text-lg lg:text-xl w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                {userState ? userState.username : 'N/A'}
              </div>
            </div>
            <div>
              <div class="flex items-center justify-start">
                <a
                  className="text-base text-purple-400 hover:text-purple-800"
                  onClick={handleLogout}
                  href="#"
                >
                  Logout
                </a>
                <a
                  className="ml-4 text-base text-red-500 hover:text-red-800"
                  onClick={handleDelete}
                  href="#"
                >
                  Delete account
                </a>
                <Link to="/" className="flex-1 flex justify-end">
                  <a className="text-base text-purple-500 hover:text-purple-800 mr-0">
                    Back to main
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
