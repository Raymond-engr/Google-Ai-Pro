import React from 'react';
import { SearchItem } from './Data';

interface TrendingSearchesProps {
  searches: SearchItem[];
  onSearchClick: (query: string) => void;
}

const TrendingSearches: React.FC<TrendingSearchesProps> = ({ searches, onSearchClick }) => {
  return (
    <>
      <div className="w-full max-w-lg mx-auto mt-8">
        <h2 className="text-gray-800 dark:text-white text-xl mb-4 flex items-center text-opacity-100 dark:text-opacity-90">
        Trending searches
          <span className="ml-auto relative flex items-center mb-10">
            <a className="hover:bg-blue-300 dark:hover:bg-gray-800" href="#">
              <span className="text-sm absolute top-0">•</span>
              <span className="text-sm absolute top-1">•</span>
              <span className="text-sm absolute top-2">•</span>
            </a>
          </span>
        </h2>
        <ul>
          {searches.map((item) => (
            <li key={item.query} className="mb-2 relative">
              <button
                onClick={() => onSearchClick(item.query)}
                className="flex items-center w-full text-left text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-800 p-1 rounded text-opacity-95 dark:text-opacity-80"
              >
                <span className="mr-3">↗</span>
                <div>
                  <div>{item.query}</div>
                  {item.description && <div className="text-gray-500 dark:text-gray-400 text-sm">{item.description}</div>}
                </div>
              </button>
              <div className=" border-b border-black dark:border-white border-b-[1px] opacity-20 dark:opacity-30"></div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TrendingSearches;