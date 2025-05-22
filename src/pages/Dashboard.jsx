import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-800">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 dark:text-gray-200 text-3xl font-medium">Dashboard</h3>
            <div className="mt-4">
              <div className="flex flex-wrap -mx-6">
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white dark:bg-gray-700">
                    <div className="p-3 rounded-full bg-indigo-600 bg-opacity-75">
                      <svg className="h-8 w-8 text-white" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.2 9.08571C18.2 11.5357 16.31 13.5786 14 13.5786C11.69 13.5786 9.8 11.5357 9.8 9.08571C9.8 6.63571 11.69 4.59286 14 4.59286C16.31 4.59286 18.2 6.63571 18.2 9.08571Z" fill="currentColor"></path>
                        <path d="M25.2 12.0429C25.2 13.6714 23.94 15 22.4 15C20.86 15 19.6 13.6714 19.6 12.0429C19.6 10.4143 20.86 9.08571 22.4 9.08571C23.94 9.08571 25.2 10.4143 25.2 12.0429Z" fill="currentColor"></path>
                        <path d="M19.6 22.3571C19.6 19.9071 20.86 18.5786 22.4 18.5786C23.94 18.5786 25.2 19.9071 25.2 22.3571C25.2 24.8071 23.94 26.1357 22.4 26.1357C20.86 26.1357 19.6 24.8071 19.6 22.3571Z" fill="currentColor"></path>
                        <path d="M14 22.3571C14 19.9071 12.74 18.5786 11.2 18.5786C9.66 18.5786 8.4 19.9071 8.4 22.3571C8.4 24.8071 9.66 26.1357 11.2 26.1357C12.74 26.1357 14 24.8071 14 22.3571Z" fill="currentColor"></path>
                        <path d="M8.4 12.0429C8.4 13.6714 9.66 15 11.2 15C12.74 15 14 13.6714 14 12.0429C14 10.4143 12.74 9.08571 11.2 9.08571C9.66 9.08571 8.4 10.4143 8.4 12.0429Z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div className="mx-5">
                      <h4 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">240</h4>
                      <div className="text-gray-500 dark:text-gray-400">Total Users</div>
                    </div>
                  </div>
                </div>
                {/* Add more dashboard items as needed */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
