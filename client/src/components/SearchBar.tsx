import React, { useState } from 'react';

interface SearchBarProps {
  onAiSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onAiSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAiSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 pr-10 rounded-full bg-white dark:bg-[rgb(28,29,32)] text-gray-700 dark:text-white focus:outline-none ring-1 ring-black dark:ring-white ring-opacity-20 dark:ring-opacity-50"
        placeholder="Search..."
      />
      <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2" aria-label="Search">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;