import React, { useState, useEffect } from 'react';
import Header from './Header';
import Loading from '../Loading';

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />
      <div className="pt-16">
        <main className="py-7 px-4 md:px-5">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
