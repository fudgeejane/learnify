import React, { useState, useEffect } from 'react';

const ModalCourse = ({ isOpen, onClose, mode = 'create', course = null }) => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (course && mode === 'edit') {
      setCourseData({
        title: course.title,
        description: course.description
      });
    }
  }, [course, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle course creation/editing logic here
    console.log('Course data:', courseData);
    onClose();
  };

  const handleDelete = () => {
    // TODO: Handle course deletion logic here
    console.log('Deleting course:', course);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  const getModalTitle = () => {
    switch (mode) {
      case 'edit':
        return 'Edit Course';
      case 'delete':
        return 'Delete Course';
      default:
        return 'Create New Course';
    }
  };

  const renderContent = () => {
    if (mode === 'delete') {
      return (
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete this course? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Delete Course
            </button>
          </div>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Course Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4A6BFF] focus:border-[#4A6BFF]"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4A6BFF] focus:border-[#4A6BFF] resize-none"
            required
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-[#4A6BFF] rounded-md hover:bg-[#3A5BEF] transition-colors"
          >
            {mode === 'edit' ? 'Save Changes' : 'Create Course'}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-[#4A6BFF]">{getModalTitle()}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default ModalCourse; 