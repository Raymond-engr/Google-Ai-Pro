import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  height?: string;
  width?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 1, height = '100px', width = '100%' }) => {
  const loaders = Array.from({ length: count });

  return (
    <>
      {loaders.map((_, index) => (
        <div
          key={index}
          className="bg-gray-400 dark:bg-gray-500 animate-pulse mb-2 mt-2 rounded"
          style={{ height, width }}
        ></div>
      ))}
    </>
  );
};

export default SkeletonLoader;