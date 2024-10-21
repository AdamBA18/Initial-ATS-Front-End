import React, { useState } from 'react';
import { Check, Circle, ChevronUp, ChevronDown } from 'lucide-react';

const stages = [
  { id: 1, name: 'Applied' },
  { id: 2, name: 'Phone Screen' },
  { id: 3, name: 'Interview' },
  { id: 4, name: 'Offer' },
  { id: 5, name: 'Hired' },
];

interface HiringStagesProps {
  candidates: any[];
  onCandidateClick: (candidate: any) => void;
  selectedCandidate: any;
  onUpdateCandidate: (updatedCandidate: any) => void;
}

export const HiringStages: React.FC<HiringStagesProps> = ({
  candidates,
  onCandidateClick,
  selectedCandidate,
  onUpdateCandidate,
}) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

  const handleDragStart = (e: React.DragEvent, candidateId: number) => {
    e.dataTransfer.setData('candidateId', candidateId.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stageId: number) => {
    e.preventDefault();
    const candidateId = parseInt(e.dataTransfer.getData('candidateId'));
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      onUpdateCandidate({ ...candidate, stage: stageId });
    }
  };

  const sortedCandidates = React.useMemo(() => {
    let sortableCandidates = [...candidates];
    if (sortConfig !== null) {
      sortableCandidates.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCandidates;
  }, [candidates, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortDirection = (name: string) => {
    if (!sortConfig || sortConfig.key !== name) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('name')}
            >
              Candidate {getSortDirection('name')}
            </th>
            {stages.map((stage) => (
              <th
                key={stage.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort(`stage${stage.id}`)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                {stage.name} {getSortDirection(`stage${stage.id}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedCandidates.map((candidate) => (
            <tr
              key={candidate.id}
              onClick={() => onCandidateClick(candidate)}
              className={`cursor-pointer ${
                selectedCandidate && selectedCandidate.id === candidate.id
                  ? 'bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, candidate.id)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                <div className="text-xs text-gray-500">{candidate.role}</div>
              </td>
              {stages.map((stage) => (
                <td
                  key={stage.id}
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    candidate.stage === stage.id ? 'bg-green-100' : ''
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {candidate.stage > stage.id ? (
                      <Check className="text-green-500" size={20} />
                    ) : candidate.stage === stage.id ? (
                      <Circle className="text-blue-500 fill-current" size={20} />
                    ) : null}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};