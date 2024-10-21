import React, { useState, useEffect } from 'react';

interface JobPostingFormProps {
  onSubmit: (jobPosting: JobPosting, isDraft: boolean) => void;
  onCancel: () => void;
  initialJob?: JobPosting;
}

interface JobPosting {
  id?: number;
  title: string;
  department: string;
  location: string;
  description: string;
  jobType: string;
  salary: {
    minimum: number;
    maximum: number;
    currency: string;
    interval: string;
  };
  applicationUrl: string;
  companyName: string;
  externalId: string;
  status?: string;
}

export const JobPostingForm: React.FC<JobPostingFormProps> = ({ onSubmit, onCancel, initialJob }) => {
  const [jobPosting, setJobPosting] = useState<JobPosting>({
    title: '',
    department: '',
    location: '',
    description: '',
    jobType: '',
    salary: {
      minimum: 0,
      maximum: 0,
      currency: 'USD',
      interval: 'YEAR'
    },
    applicationUrl: '',
    companyName: '',
    externalId: ''
  });

  useEffect(() => {
    if (initialJob) {
      setJobPosting({
        ...initialJob,
        salary: {
          minimum: initialJob.salary?.minimum ?? 0,
          maximum: initialJob.salary?.maximum ?? 0,
          currency: initialJob.salary?.currency ?? 'USD',
          interval: initialJob.salary?.interval ?? 'YEAR'
        },
        jobType: initialJob.jobType || '',
        applicationUrl: initialJob.applicationUrl || '',
        companyName: initialJob.companyName || '',
        externalId: initialJob.externalId || ''
      });
    }
  }, [initialJob]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('salary.')) {
      const salaryField = name.split('.')[1];
      setJobPosting(prev => ({
        ...prev,
        salary: {
          ...prev.salary,
          [salaryField]: salaryField === 'minimum' || salaryField === 'maximum' ? Number(value) || 0 : value
        }
      }));
    } else {
      setJobPosting(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault();
    onSubmit(jobPosting, isDraft);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="sticky top-0 bg-white z-10 pb-4 mb-4 border-b">
        <h2 className="text-2xl font-bold mb-4">{initialJob ? 'Edit Job Posting' : 'New Job Posting'}</h2>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Job Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          name="title"
          value={jobPosting.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
          Department
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="department"
          type="text"
          name="department"
          value={jobPosting.department}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
          Location
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="location"
          type="text"
          name="location"
          value={jobPosting.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobType">
          Job Type
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="jobType"
          name="jobType"
          value={jobPosting.jobType}
          onChange={handleChange}
          required
        >
          <option value="">Select Job Type</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="CONTRACTOR">Contractor</option>
          <option value="TEMPORARY">Temporary</option>
          <option value="INTERN">Intern</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Salary</label>
        <div className="flex space-x-2">
          <input
            className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="salary.minimum"
            value={jobPosting.salary.minimum}
            onChange={handleChange}
            placeholder="Min"
          />
          <input
            className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="salary.maximum"
            value={jobPosting.salary.maximum}
            onChange={handleChange}
            placeholder="Max"
          />
          <select
            className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="salary.currency"
            value={jobPosting.salary.currency}
            onChange={handleChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <select
            className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="salary.interval"
            value={jobPosting.salary.interval}
            onChange={handleChange}
          >
            <option value="HOUR">Per Hour</option>
            <option value="DAY">Per Day</option>
            <option value="WEEK">Per Week</option>
            <option value="MONTH">Per Month</option>
            <option value="YEAR">Per Year</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="applicationUrl">
          Application URL
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="applicationUrl"
          type="url"
          name="applicationUrl"
          value={jobPosting.applicationUrl}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
          Company Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="companyName"
          type="text"
          name="companyName"
          value={jobPosting.companyName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="externalId">
          External ID
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="externalId"
          type="text"
          name="externalId"
          value={jobPosting.externalId}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Job Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          name="description"
          value={jobPosting.description}
          onChange={handleChange}
          rows={4}
          required
        ></textarea>
      </div>
      <div className="flex items-center justify-between mt-6">
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={(e) => handleSubmit(e, true)}
        >
          {initialJob ? 'Save as Draft' : 'Close Draft'}
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {initialJob ? 'Update Job Posting' : 'Create Job Posting'}
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};