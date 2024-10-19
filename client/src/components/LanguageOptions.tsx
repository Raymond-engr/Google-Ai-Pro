import React from 'react';

const LanguageOptions: React.FC = () => {
  return (
    <div className="text-center pt-6">
      <p className="text-sm text-black dark:text-white text-opacity-60 dark:text-opacity-70">Google offered in:</p>
      <ul className="flex justify-center space-x-4">
        <li>
          <a className="text-blue-700 dark:text-blue-400 hover:text-blue-300 text-sm text-opacity-100 dark:text-opacity-90" href="#">Hausa</a>
        </li>
        <li>
          <a className="text-blue-700 dark:text-blue-400 hover:text-blue-300 text-sm text-opacity-100 dark:text-opacity-90" href="#">Igbo</a>
        </li>
        <li>
          <a className="text-blue-700 dark:text-blue-400 hover:text-blue-300 text-sm text-opacity-100 dark:text-opacity-90" href="#">Èdè Yorùbá</a>
        </li>
        <li>
          <a className="text-blue-700 dark:text-blue-400 hover:text-blue-300 text-sm text-opacity-100 dark:text-opacity-90" href="#">Nigerian Pidgin</a>
        </li>
      </ul>
    </div>
  );
};

export default LanguageOptions;