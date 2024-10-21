import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Users, Briefcase } from 'lucide-react';

interface DashboardProps {
  jobPostings: any[];
}

export const Dashboard: React.FC<DashboardProps> = ({ jobPostings }) => {
  const activeJobsCount = jobPostings.filter(job => job.status === 'Active').length;
  const totalCandidates = jobPostings.reduce((sum, job) => sum + job.candidates.length, 0);
  const interviewsThisWeek = 8; // This is still a mock value. In a real app, you'd calculate this.

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Active Job Postings"
          value={activeJobsCount.toString()}
          icon={<Briefcase className="text-blue-500" size={24} />}
          link="/job-postings"
        />
        <DashboardCard
          title="Total Candidates"
          value={totalCandidates.toString()}
          icon={<Users className="text-green-500" size={24} />}
          link="/candidates"
        />
        <DashboardCard
          title="Interviews This Week"
          value={interviewsThisWeek.toString()}
          icon={<BarChart className="text-purple-500" size={24} />}
          link="/interviews"
        />
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{ title: string; value: string; icon: React.ReactNode; link: string }> = ({ title, value, icon, link }) => (
  <Link to={link} className="block">
    <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  </Link>
);