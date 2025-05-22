import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Welcome to Our App
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
          Join us and experience the best service.
        </p>
        <div className="mt-5">
          <Link
            to="/signin"
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
