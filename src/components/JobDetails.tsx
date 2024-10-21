import React, { useState, useMemo } from 'react';
import { MapPin, Users, Calendar, X, Link as LinkIcon, Edit, Search } from 'lucide-react';
import { HiringStages } from './HiringStages';
import { CandidateDetails } from './CandidateDetails';
import { JobPostingForm } from './JobPostingForm';

interface JobDetailsProps {
  job: {
    id: number;
    title: string;
    department: string;
    location: string;
    description: string;
    candidates: any[];
    applicationUrl: string;
  };
  onJobUpdate: (updatedJob: any) => void;
}

export const JobDetails: React.FC<JobDetailsProps> = ({ job, onJobUpdate }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCandidateClick = (candidate: any) => {
    setSelectedCandidate(candidate);
  };

  const handleClosePane = () => {
    setSelectedCandidate(null);
  };

  const handleUpdateNotes = (candidateId: number, updatedNotes: any[]) => {
    const updatedCandidates = job.candidates.map(candidate =>
      candidate.id === candidateId ? { ...candidate, notes: updatedNotes } : candidate
    );
    onJobUpdate({ ...job, candidates: updatedCandidates });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleJobUpdate = (updatedJob: any) => {
    onJobUpdate(updatedJob);
    setIsEditing(false);
  };

  const filteredCandidates = useMemo(() => {
    return job.candidates.filter(candidate => {
      const searchString = `
        ${candidate.name.toLowerCase()}
        ${candidate.role.toLowerCase()}
        ${candidate.resumeText.toLowerCase()}
        ${candidate.notes ? candidate.notes.map(note => note.content.toLowerCase()).join(' ') : ''}
      `;
      return searchString.includes(searchQuery.toLowerCase());
    });
  }, [job.candidates, searchQuery]);

  if (isEditing) {
    return (
      <JobPostingForm
        onSubmit={handleJobUpdate}
        onCancel={() => setIsEditing(false)}
        initialJob={job}
      />
    );
  }

  return (
    <div className="flex h-full">
      <div className={`flex-grow overflow-auto ${selectedCandidate ? 'pr-4' : ''}`}>
        <div className="bg-white shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <button
              onClick={handleEditClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <Edit size={18} className="mr-2" />
              Edit Job
            </button>
          </div>
          <div className="flex space-x-4 text-gray-600">
            <p className="flex items-center">
              <MapPin size={18} className="mr-2" />
              {job.location}
            </p>
            <p className="flex items-center">
              <Users size={18} className="mr-2" />
              {job.candidates.length} Applicants
            </p>
            <p className="flex items-center">
              <Calendar size={18} className="mr-2" />
              Posted 2 weeks ago
            </p>
            <a
              href={job.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <LinkIcon size={18} className="mr-2" />
              Application Link
            </a>
          </div>
        </div>
        <div className="bg-white shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Job Description</h3>
          <p className="whitespace-pre-wrap">{job.description}</p>
        </div>
        <div className="bg-white shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Applicants</h3>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search applicants..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <HiringStages
            candidates={filteredCandidates}
            onCandidateClick={handleCandidateClick}
            selectedCandidate={selectedCandidate}
            onUpdateCandidate={(updatedCandidate) => {
              const updatedCandidates = job.candidates.map(c =>
                c.id === updatedCandidate.id ? updatedCandidate : c
              );
              onJobUpdate({ ...job, candidates: updatedCandidates });
            }}
          />
        </div>
      </div>
      {selectedCandidate && (
        <div className="w-1/3 bg-white shadow-md p-6 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Candidate Details</h3>
            <button onClick={handleClosePane} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <CandidateDetails
            candidate={selectedCandidate}
            onUpdateNotes={(updatedNotes) => handleUpdateNotes(selectedCandidate.id, updatedNotes)}
          />
        </div>
      )}
    </div>
  );
};