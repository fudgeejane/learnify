import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ModalLogin = ({ isOpen, onClose, modalType, message }) => {
  if (!isOpen) return null;

  const renderModalContent = () => {
    switch (modalType) {
      case 'forgotPassword':
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Reset Password</h3>
            <p className="text-gray-600 mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <button
              className="w-full bg-[#4A6BFF] text-white py-2 rounded-md hover:bg-[#3A5BEF] transition-colors"
            >
              Send Reset Link
            </button>
          </div>
        );

      case 'emailVerificationSent':
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Verification Email Sent</h3>
            <p className="text-gray-600 mb-4">
              We've sent a verification email to your address. Please check your inbox and follow the instructions to verify your account.
            </p>
            <button
              className="w-full bg-[#4A6BFF] text-white py-2 rounded-md hover:bg-[#3A5BEF] transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        );

      case 'needVerification':
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Email Verification Required</h3>
            <p className="text-gray-600 mb-4">
              Please verify your email address to continue. Check your inbox for the verification link.
            </p>
            <button
              className="w-full bg-[#4A6BFF] text-white py-2 rounded-md hover:bg-[#3A5BEF] transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        );

      case 'invalidVerification':
        return (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Invalid Verification</h3>
            <p className="text-gray-600 mb-4">
              { "The verification link is invalid or has expired. Please try again."}
            </p>
            <button
              className="w-full bg-[#4A6BFF] text-white py-2 rounded-md hover:bg-[#3A5BEF] transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
        {renderModalContent()}
      </div>
    </div>
  );
};

export default ModalLogin; 