import React from 'react';

export const Google: React.FC = () => {
  return (
    <div className="font-sans text-5xl font-medium pb-5 text-center flex">
      <span className="text-blue-500 dark:text-white">G</span>
      <span className="text-red-500 dark:text-white">o</span>
      <span className="text-yellow-500 dark:text-white">o</span>
      <span className="text-blue-500 dark:text-white">g</span>
      <span className="text-green-500 dark:text-white">l</span>
      <span className="text-red-500 dark:text-white">e</span>
    </div>
  );
};

export const GoogleImages: React.FC = () => {
  return (
    <div className="text-center pb-5">
      <div className="font-sans text-5xl font-medium pb-0 flex">
        <span className="text-blue-500 dark:text-white">G</span>
        <span className="text-red-500 dark:text-white">o</span>
        <span className="text-yellow-500 dark:text-white">o</span>
        <span className="text-blue-500 dark:text-white">g</span>
        <span className="text-green-500 dark:text-white">l</span>
        <span className="text-red-500 dark:text-white">e</span>
      </div>
      <p className="text-xs text-blue-500 pt-0 ml-[130px] -mt-1">
        images
      </p>
    </div>
  );
};