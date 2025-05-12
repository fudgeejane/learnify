import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaSearch, FaBell, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { getUserFromFirestore } from '../../firebase';
import ModalCourse from '../components/ModalCourse';

const Header = ({ toggleSidebar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDetails = await getUserFromFirestore(user.uid);
          setUserData(userDetails);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-40 flex items-center justify-between px-6 border-b border-gray-100">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-[#4A6BFF] hover:text-[#3A5BEF] transition-colors">Learnify</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search courses, lessons..."
                className="w-80 pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#4A6BFF] focus:ring-2 focus:ring-[#4A6BFF]/20 transition-all duration-200 bg-gray-50/50 hover:bg-white"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#4A6BFF] transition-colors" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Create Course Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#4A6BFF] text-white rounded-lg hover:bg-[#3A5BEF] transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <i className='bi bi-plus-circle-fill text-lg'></i>
            <span className="font-medium">Create Course</span>
          </button>

          {/* User Profile Section */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A6BFF] to-[#3A5BEF] text-white flex items-center justify-center font-semibold shadow-sm">
                {userData ? getInitials(userData.firstName, userData.lastName) : 'U'}
              </div>
              <span className="text-gray-700 font-medium hidden md:block">
                {userData?.fullName || 'User'}
              </span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1.5 z-50 border border-gray-100">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{userData?.fullName || 'User'}</p>
                  <p className="text-xs text-gray-500">{userData?.email || 'user@example.com'}</p>
                </div>
                <button
                  onClick={() => {
                    navigate('/settings');
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
                >
                  <FaCog className="text-gray-500" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
                >
                  <FaSignOutAlt className="text-red-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <ModalCourse 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Header;
