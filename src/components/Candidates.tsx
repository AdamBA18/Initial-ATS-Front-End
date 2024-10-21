import React, { useState, useMemo } from 'react';
import { CandidateSearch } from './CandidateSearch';
import { CandidateDetails } from './CandidateDetails';

interface Note {
  id: number;
  content: string;
  createdAt: string;
  createdBy: string;
  editedAt?: string;
  editedBy?: string;
}

interface Candidate {
  id: number;
  name: string;
  role: string;
  status: string;
  score: number;
  skills: string[];
  experience: string;
  location: string;
  stage: number;
  resumeText: string;
  education: string;
  notes?: Note[];
}

interface CandidatesProps {
  jobPostings: {
    id: number;
    title: string;
    candidates: Candidate[];
  }[];
}

export const Candidates: React.FC<CandidatesProps> = ({ jobPostings }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allCandidates = useMemo(() => {
    if (!Array.isArray(jobPostings)) {
      console.error('jobPostings is not an array:', jobPostings);
      return [];
    }
    return jobPostings.reduce((acc, job) => {
      if (job && Array.isArray(job.candidates)) {
        return acc.concat(job.candidates.map(candidate => ({
          ...candidate,
          jobTitle: job.title
        })));
      }
      return acc;
    }, [] as (Candidate & { jobTitle: string })[]);
  }, [jobPostings]);

  const filteredCandidates = useMemo(() => {
    return allCandidates.filter(candidate => {
      const searchString = `
        ${candidate.name}
        ${candidate.role || ''}
        ${candidate.skills ? candidate.skills.join(' ') : ''}
        ${candidate.experience || ''}
        ${candidate.location || ''}
        ${candidate.resumeText || ''}
        ${candidate.education || ''}
        ${candidate.jobTitle || ''}
        ${candidate.notes ? candidate.notes.map(note => `${note.content} ${note.createdBy} ${note.editedBy || ''}`).join(' ') : ''}
      `.toLowerCase();

      const searchTerms = searchQuery.toLowerCase().split(' ');
      return searchTerms.every(term => searchString.includes(term));
    });
  }, [allCandidates, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleUpdateNotes = (candidateId: number, updatedNotes: Note[]) => {
    // This function should be implemented to update notes in the parent component
    console.log('Updating notes for candidate:', candidateId, updatedNotes);
  };

  return (
    <div className="flex h-full">
      <div className="w-2/3 pr-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Candidates</h1>
        <CandidateSearch onSearch={handleSearch} />
        <div className="bg-white shadow-md rounded-lg overflow-hidden mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id} onClick={() => handleCandidateClick(candidate)} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{candidate.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.role || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.jobTitle || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(candidate.stage)}`}>
                      {getStatusText(candidate.stage)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.score || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-1/3 overflow-auto">
        {selectedCandidate && (
          <CandidateDetails
            candidate={selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
            onUpdateNotes={handleUpdateNotes}
          />
        )}
      </div>
    </div>
  );
};

const getStatusColor = (stage: number) => {
  switch (stage) {
    case 1:
      return 'bg-yellow-100 text-yellow-800';
    case 2:
      return 'bg-blue-100 text-blue-800';
    case 3:
      return 'bg-green-100 text-green-800';
    case 4:
      return 'bg-purple-100 text-purple-800';
    case 5:
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (stage: number) => {
  switch (stage) {
    case 1:
      return 'Applied';
    case 2:
      return 'Phone Screen';
    case 3:
      return 'Interview';
    case 4:
      return 'Offer';
    case 5:
      return 'Hired';
    default:
      return 'Unknown';
  }
};