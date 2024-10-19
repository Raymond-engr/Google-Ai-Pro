import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/Navbar';

const ErrorPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', darkMode ? 'false' : 'true');
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="font-sans text-gray-900 text-opacity-87 bg-white leading-6 font-normal antialiased min-h-screen dark:bg-[rgb(32,33,37)] dark:text-white flex flex-col">
        <main className="flex-grow">
          <div className="m-0 min-w-[320px] min-h-full">
            <NavBar />
            <h2 className="tracking-[var(--spacing)] capitalize leading-5 mb-3 text-2xl py-6">
    Error 404: Page not found
            </h2>
            <Link to='/' className="inline-block px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Back Home
            </Link>
          </div>
        </main>
        <div className="m-0 min-w-[320px] min-h-full">
          <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
    </div>
  );
};
export default ErrorPage;