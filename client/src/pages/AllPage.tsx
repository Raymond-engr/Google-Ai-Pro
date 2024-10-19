import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavBar from '../components/Navbar';

const AllPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const removeChange = true;
  
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
            <Header removeChange={removeChange} />
          </div>
        </main>
        <div className="m-0 min-w-[320px] min-h-full">
          <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
    </div>
  );
};
export default AllPage;