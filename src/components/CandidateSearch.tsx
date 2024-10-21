import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface CandidateSearchProps {
  onSearch: (searchQuery: string) => void;
}

export const CandidateSearch: React.FC<CandidateSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search candidates (e.g., JavaScript AND React OR Angular)"
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        <button
          type="submit"
          className="absolute right-2 top-2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <p>Advanced search tips:</p>
        <ul className="list-disc list-inside">
          <li>Use AND, OR, NOT for boolean logic</li>
          <li>Use quotes for exact phrases: "project manager"</li>
          <li>Use parentheses for grouping: (JavaScript OR TypeScript) AND React</li>
        </ul>
      </div>
    </form>
  );
};