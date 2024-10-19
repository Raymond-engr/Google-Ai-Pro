import React from 'react';

interface FooterProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Footer: React.FC<FooterProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <footer className="mt-auto pt-2 bg-gray-200 dark:bg-[rgb(20,21,24)] text-gray-600 dark:text-white text-sm text-opacity-90 dark:text-opacity-50">
      <div className="mb-2 text-base pl-2 relative">Nigeria</div>
      <div className=" border-b border-black dark:border-white border-b-[1px] opacity-10 dark:opacity-10"></div>
      <div className="flex flex-wrap justify-center gap-4 py-4 pr-4">
        <span onClick={toggleDarkMode} className="cursor-pointer">
          Dark theme: {darkMode ? 'on' : 'off'}
        </span>
        <span><a className="hover:bg-blue-100 dark:hover:bg-gray-800" href="#">Settings</a></span>
        <span><a className="hover:bg-blue-100 dark:hover:bg-gray-800" href="#">Privacy</a></span>
        <span><a className="hover:bg-blue-100 dark:hover:bg-gray-800" href="#">Terms</a></span>
        <span><a className="hover:bg-blue-100 dark:hover:bg-gray-800" href="#">Advertising</a></span>
        <span><a className="hover:bg-blue-100 dark:hover:bg-gray-800" href="#">Business</a></span>
        <span><a className="hover:bg-blue-100 dark:hover:bg-gray-800" href="#">About</a></span>
      </div>
    </footer>
  );
};
export default Footer;