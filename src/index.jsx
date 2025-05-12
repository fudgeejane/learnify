import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useHandleUser } from './hooks/useHandleUser';
import ModalLogin from './components/ModalLogin';

const Index = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { handleSignUp, handleSignIn, handleForgotPassword, loading, error } = useHandleUser();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        const user = await handleSignIn(formData.email, formData.password);
        if (user.emailVerified) {
          navigate('/dashboard');
        } else {
          setModalType('needVerification');
          setIsModalOpen(true);
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords don't match");
        }
        await handleSignUp(formData.email, formData.password, formData.firstName, formData.lastName);
        setModalType('emailVerificationSent');
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(error);
      setModalType('invalidVerification');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
      <div
        className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 60%, rgba(240,240,255,0.18) 100%)',
          boxShadow: '0 0 10px 0 rgba(160,160,255,0.2)',
        }}
      >
        {/* Left side - Landing content with gradient and shapes */}
        <div className="relative w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-gradient-to-br from-[#4A6BFF] to-[#6A4DFF] text-white overflow-hidden">
          {/* Abstract shapes */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#8FB3FF] opacity-20 rounded-full blur-2xl -z-10" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#A08AFF] opacity-20 rounded-full blur-2xl -z-10" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#A08AFF] opacity-10 rounded-full blur-2xl -z-10" />

          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 tracking-wide">Learnify!</h1>
            <p className="mb-6 text-lg opacity-80 max-w-md">
              Learnify is a platform that provides interactive and expert-led courses to help you learn new skills and advance your career.
            </p>
          </div>
        </div>

        {/* Right side - Auth forms in card style */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12" style={{ color: '#333333' }}>
          <div className="max-w-md mx-auto w-full">
            <div className="flex justify-center mb-8">
              <button
                className={`px-6 py-2 transition-all duration-200 font-semibold focus:outline-none ${isSignIn ? 'text-[#4A6BFF] border-b-2 border-[#4A6BFF]' : 'text-gray-400'} hover:scale-105`}
                onClick={() => setIsSignIn(true)}
              >
                Sign In
              </button>
              <button
                className={`px-6 py-2 transition-all duration-200 font-semibold focus:outline-none ${!isSignIn ? 'text-[#4A6BFF] border-b-2 border-[#4A6BFF]' : 'text-gray-400'} hover:scale-105`}
                onClick={() => setIsSignIn(false)}
              >
                Sign Up
              </button>
            </div>

            {isSignIn ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#555555]">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#F0F0F5] border-0 border-b-2 border-[#B0B0C0] focus:border-[#4A6BFF] focus:ring-0 px-0 py-2 placeholder-gray-400 text-[#333333] transition-colors"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#555555]">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-[#F0F0F5] border-0 border-b-2 border-[#B0B0C0] focus:border-[#4A6BFF] focus:ring-0 px-0 py-2 placeholder-gray-400 text-[#333333] transition-colors"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#4A6BFF]"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <span className="text-gray-500">Remember me</span>
                  </label>
                  <button 
                    type="button" 
                    className="text-[#4A6BFF] hover:underline"
                    onClick={() => {
                      setModalType('forgotPassword');
                      setIsModalOpen(true);
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-md text-white font-bold text-lg transition-all duration-200 transform hover:scale-105"
                  style={{
                    background: 'linear-gradient(90deg, #4A6BFF 0%, #6A4DFF 100%)',
                    boxShadow: '0 2px 12px rgba(74,107,255,0.3)',
                  }}
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="text-center mt-4">
                  <p className="text-gray-500 text-xs">Or sign in with</p>
                  <div className="flex justify-center space-x-4 mt-2">
                    <button type="button" className="p-2 rounded-full bg-[#F0F0F5] hover:bg-[#E0E0E5] transition-all duration-200 transform hover:scale-110">
                      <FaGoogle className="text-[#4A6BFF]" />
                    </button>
                    <button type="button" className="p-2 rounded-full bg-[#F0F0F5] hover:bg-[#E0E0E5] transition-all duration-200 transform hover:scale-110">
                      <FaFacebook className="text-[#6A4DFF]" />
                    </button>
                    <button type="button" className="p-2 rounded-full bg-[#F0F0F5] hover:bg-[#E0E0E5] transition-all duration-200 transform hover:scale-110">
                      <FaTwitter className="text-[#4A6BFF]" />
                    </button>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-[#4A6BFF] text-xs font-semibold hover:underline transition-all duration-200 transform hover:scale-105"
                    onClick={() => setIsSignIn(false)}
                  >
                    Don't have an account? Sign Up
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#555555]">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-[#F0F0F5] border-0 border-b-2 border-[#B0B0C0] focus:border-[#4A6BFF] focus:ring-0 px-0 py-2 placeholder-gray-400 text-[#333333] transition-colors"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#555555]">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-[#F0F0F5] border-0 border-b-2 border-[#B0B0C0] focus:border-[#4A6BFF] focus:ring-0 px-0 py-2 placeholder-gray-400 text-[#333333] transition-colors"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#555555]">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#F0F0F5] border-0 border-b-2 border-[#B0B0C0] focus:border-[#4A6BFF] focus:ring-0 px-0 py-2 placeholder-gray-400 text-[#333333] transition-colors"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#555555]">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-[#F0F0F5] border-0 border-b-2 border-[#B0B0C0] focus:border-[#4A6BFF] focus:ring-0 px-0 py-2 placeholder-gray-400 text-[#333333] transition-colors"
                    placeholder="Password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#555555]">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-[#F0F0F5] border-0 border-b-2 border-[#B0B0C0] focus:border-[#4A6BFF] focus:ring-0 px-0 py-2 placeholder-gray-400 text-[#333333] transition-colors"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-md text-white font-bold text-lg transition-all duration-200 transform hover:scale-105"
                  style={{
                    background: 'linear-gradient(90deg, #4A6BFF 0%, #6A4DFF 100%)',
                    boxShadow: '0 2px 12px rgba(74,107,255,0.3)',
                  }}
                  disabled={loading}
                >
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </button>

                <div className="text-center mt-4">
                  <p className="text-gray-500 text-xs">Or sign up with</p>
                  <div className="flex justify-center space-x-4 mt-2">
                    <button type="button" className="p-2 rounded-full bg-[#F0F0F5] hover:bg-[#E0E0E5] transition-all duration-200 transform hover:scale-110">
                      <FaGoogle className="text-[#4A6BFF]" />
                    </button>
                    <button type="button" className="p-2 rounded-full bg-[#F0F0F5] hover:bg-[#E0E0E5] transition-all duration-200 transform hover:scale-110">
                      <FaFacebook className="text-[#6A4DFF]" />
                    </button>
                    <button type="button" className="p-2 rounded-full bg-[#F0F0F5] hover:bg-[#E0E0E5] transition-all duration-200 transform hover:scale-110">
                      <FaTwitter className="text-[#4A6BFF]" />
                    </button>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-[#4A6BFF] text-xs font-semibold hover:underline transition-all duration-200 transform hover:scale-105"
                    onClick={() => setIsSignIn(true)}
                  >
                    Already have an account? Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <ModalLogin
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalType={modalType}
        message={error}
      />
    </div>
  );
};

export default Index;