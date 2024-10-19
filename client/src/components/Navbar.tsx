import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const location = useLocation();

  const isAllActive =
  location.pathname === '/' ||
  location.pathname === '/All';
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mx-4 text-gray-500 dark:text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17V7m0 10a3 3 0 01-3 3H3.75A2.25 2.25 0 011.5 14.25V7.75A2.25 2.25 0 013.75 5.5h11.5a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0119.25 17H16a3 3 0 01-3-3z"
          />
        </svg>
        
        <nav>
          <div className="flex flex-wrap justify-center gap-4 py-3 pr-4">
            <NavLink 
              to="/All"
              className={isAllActive ? 'font-bold underline cursor-pointer text-blue-800 dark:text-blue-700' : 'text-gray-500 dark:text-gray-400'}
            >
              <span className="ml-2 font-medium text-sm">ALL</span>
            </NavLink>
            <div className="flex items-center">
              <NavLink 
                to="/Images" 
                className={({ isActive }) => 
                  isActive ? 'font-bold underline cursor-pointer text-blue-800 dark:text-blue-700' : 'text-gray-500 dark:text-gray-400'
                }
              >
                <span className="font-medium text-sm">IMAGES</span>
              </NavLink>
            </div>
          </div>
        </nav>
      
      </div>
      <div className="flex items-center">
        <div className="ml-auto relative flex flex-col items-center mb-10">
          <div className="flex space-x-0 -mb-1">
            <span className="text-sm">•</span>
            <span className="text-sm">•</span>
            <span className="text-sm">•</span>
          </div>
          <div className="flex space-x-0 -mb-7">
            <span className="text-sm">•</span>
            <span className="text-sm">•</span>
            <span className="text-sm">•</span>
          </div>
          <div className="flex space-x-0 -mb-5">
            <span className="text-sm">•</span>
            <span className="text-sm">•</span>
            <span className="text-sm">•</span>
          </div>
        </div>
        <button className="ml-2 rounded-full bg-orange-500 text-white font-medium text-xl px-2 py-0 mr-3 opacity-90">
          R
        </button>
      </div>
    </div>
  );
};
export default NavBar;