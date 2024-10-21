import React, { useState } from 'react';
import { Plus, Link as LinkIcon, Edit, Eye } from 'lucide-react';
import { JobPostingForm } from './JobPostingForm';
import { JobDetails } from './JobDetails';

interface JobPostingsProps {
  jobPostings: any[];
  setJobPostings: React.Dispatch<React.SetStateAction<any[]>>;
}

export const JobPostings: React.FC<JobPostingsProps> = ({ jobPostings, setJobPostings }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [viewingJobDescription, setViewingJobDescription] = useState(null);

  const handleAddJobPosting = (newJobPosting) => {
    const applicationUrl = `https://apply.company.com/job/${newJobPosting.id}`;
    setJobPostings([...jobPostings, { ...newJobPosting, id: jobPostings.length + 1, candidates: [], applicationUrl }]);
    setShowForm(false);
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setEditingJob(null);
  };

  const handleEditClick = (e, job) => {
    e.stopPropagation();
    setEditingJob(job);
    setSelectedJob(null);
  };

  const handleViewClick = (e, job) => {
    e.stopPropagation();
    setViewingJobDescription(job);
  };

  const handleJobUpdate = (updatedJob) => {
    const updatedJobPostings = jobPostings.map(job => 
      job.id === updatedJob.id ? updatedJob : job
    );
    setJobPostings(updatedJobPostings);
    setSelectedJob(updatedJob);
    setEditingJob(null);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Job Postings</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 w-full"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} className="inline mr-2" />
          New Job Posting
        </button>
        {jobPostings.map((job) => (
          <div
            key={job.id}
            onClick={() => handleJobClick(job)}
            className={`p-4 mb-2 cursor-pointer rounded-md ${
              selectedJob && selectedJob.id === job.id ? 'bg-blue-100' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{job.title}</h3>
              <div className="flex items-center">
                <button
                  onClick={(e) => handleViewClick(e, job)}
                  className="text-gray-500 hover:text-gray-700 mr-2"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={(e) => handleEditClick(e, job)}
                  className="text-gray-500 hover:text-gray-700 mr-2"
                >
                  <Edit size={18} />
                </button>
                <a
                  href={job.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <LinkIcon size={18} />
                </a>
              </div>
            </div>
            <p className="text-sm text-gray-600">{job.department}</p>
            <p className="text-sm text-gray-600">{job.location}</p>
          </div>
        ))}
      </div>
      <div className="flex-grow p-6 overflow-auto">
        {selectedJob && (
          <JobDetails
            job={selectedJob}
            onJobUpdate={handleJobUpdate}
          />
        )}
        {(showForm || editingJob) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-2/3 max-h-[90vh] overflow-y-auto">
              <JobPostingForm
                onSubmit={editingJob ? handleJobUpdate : handleAddJobPosting}
                onCancel={() => {
                  setShowForm(false);
                  setEditingJob(null);
                }}
                initialJob={editingJob}
              />
            </div>
          </div>
        )}
        {viewingJobDescription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-2/3 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">{viewingJobDescription.title}</h2>
              <p className="mb-4">
                <strong>Department:</strong> {viewingJobDescription.department}<br />
                <strong>Location:</strong> {viewingJobDescription.location}
              </p>
              <h3 className="text-xl font-bold mb-2">Job Description</h3>
              <p className="whitespace-pre-wrap">{viewingJobDescription.description}</p>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setViewingJobDescription(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};