import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { JobPostings } from './components/JobPostings';
import { Candidates } from './components/Candidates';
import { Navigation } from './components/Navigation';

function App() {
  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      description: 'We are seeking an experienced Full Stack Developer to join our team...',
      status: 'Active',
      candidates: [
        {
          id: 1,
          name: 'Alice Johnson',
          role: 'Senior Full Stack Developer',
          status: 'Interview',
          score: 85,
          skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
          experience: '8 years of full-stack development experience',
          location: 'San Francisco, CA',
          stage: 3,
          resumeText: 'Experienced full-stack developer with a strong background in JavaScript...',
          education: 'BS in Computer Science, Stanford University',
          notes: [
            {
              id: 1,
              content: 'Great communication skills, impressed during the phone screen.',
              createdAt: '2023-03-15T10:30:00Z',
              createdBy: 'John Recruiter'
            }
          ]
        },
        {
          id: 2,
          name: 'Bob Smith',
          role: 'Senior Full Stack Developer',
          status: 'Phone Screen',
          score: 75,
          skills: ['JavaScript', 'Angular', 'Python', 'PostgreSQL'],
          experience: '6 years of full-stack development experience',
          location: 'New York, NY',
          stage: 2,
          resumeText: 'Dedicated full-stack developer with expertise in Angular and Python...',
          education: 'MS in Software Engineering, NYU',
          notes: []
        }
      ]
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      description: 'We are looking for a talented UX/UI Designer to create amazing user experiences...',
      status: 'Active',
      candidates: [
        {
          id: 3,
          name: 'Carol Davis',
          role: 'UX/UI Designer',
          status: 'Offer',
          score: 92,
          skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research'],
          experience: '5 years of UX/UI design experience',
          location: 'Los Angeles, CA',
          stage: 4,
          resumeText: 'Passionate UX/UI designer with a keen eye for detail and user-centric approach...',
          education: 'BFA in Graphic Design, RISD',
          notes: [
            {
              id: 2,
              content: 'Outstanding portfolio, performed exceptionally well in design challenge.',
              createdAt: '2023-03-20T14:45:00Z',
              createdBy: 'Sarah DesignLead'
            }
          ]
        },
        {
          id: 4,
          name: 'David Wilson',
          role: 'UX/UI Designer',
          status: 'Applied',
          score: 65,
          skills: ['Adobe XD', 'InVision', 'Prototyping'],
          experience: '2 years of UX/UI design experience',
          location: 'Chicago, IL',
          stage: 1,
          resumeText: 'Aspiring UX/UI designer with a passion for creating intuitive user interfaces...',
          education: 'BA in Interactive Design, Columbia College Chicago',
          notes: []
        }
      ]
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard jobPostings={jobPostings} />} />
            <Route path="/job-postings" element={<JobPostings jobPostings={jobPostings} setJobPostings={setJobPostings} />} />
            <Route path="/candidates" element={<Candidates jobPostings={jobPostings} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;