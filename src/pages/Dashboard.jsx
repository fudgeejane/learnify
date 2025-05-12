import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { getUserFromFirestore } from '../../firebase';
import ModalCourse from '../components/ModalCourse';
import Loading from '../Loading';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
  });
  const [activeMenu, setActiveMenu] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'create',
    course: null
  });

  // Sample course data for personal use
  const [courses] = useState([
    {
      id: 1,
      title: 'Web Development Basics',
      description: 'HTML, CSS, and JavaScript fundamentals',
      progress: 'In Progress',
    },
    {
      id: 2,
      title: 'React Learning Path',
      description: 'React hooks and component patterns',
      progress: 'Not Started',
    },
    {
      id: 3,
      title: 'Design Skills',
      description: 'UI/UX principles and tools',
      progress: 'Completed',
    },
  ]);

  const handleFormChange = (e) => {
    setCourseForm({
      ...courseForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Course form submitted:', courseForm);
  };

  const handleMenuClick = (courseId) => {
    setActiveMenu(activeMenu === courseId ? null : courseId);
  };

  const handleEdit = (course) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      course: course
    });
    setActiveMenu(null);
  };

  const handleDelete = (course) => {
    setModalState({
      isOpen: true,
      mode: 'delete',
      course: course
    });
    setActiveMenu(null);
  };

  const handleModalClose = () => {
    setModalState({
      isOpen: false,
      mode: 'create',
      course: null
    });
  };

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
      } finally {
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="grd-bg2 text-white rounded-lg shadow-lg p-8 text-center mb-5 transform hover:scale-[1.01] transition-transform duration-200">
        <h1 className="text-4xl font-bold mb-3">
          Welcome, {userData?.fullName || 'User'}! 👋
        </h1>
        <p className="text-gray-100 text-lg">
          Start creating amazing courses today
        </p>
      </div>

      {/* Course Cards Grid */}
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 
                         hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] relative"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => handleMenuClick(course.id)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                
                {activeMenu === course.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
                    <button
                      onClick={() => handleEdit(course)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course)}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 pr-8">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${course.progress === 'Completed' ? 'bg-green-100 text-green-800' : 
                    course.progress === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                  {course.progress}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalCourse 
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        mode={modalState.mode}
        course={modalState.course}
      />
    </section>
  );
};

export default Dashboard; 