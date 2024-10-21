import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, LayoutDashboard } from 'lucide-react';

export const Navigation = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold text-blue-600">
              <Briefcase className="mr-2" />
              ATS Pro
            </Link>
          </div>
          <div className="flex space-x-4">
            <NavLink to="/" icon={<LayoutDashboard size={18} />} text="Dashboard" />
            <NavLink to="/job-postings" icon={<Briefcase size={18} />} text="Job Postings" />
            <NavLink to="/candidates" icon={<Users size={18} />} text="Candidates" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </Link>
);