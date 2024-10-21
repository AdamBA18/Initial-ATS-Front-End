import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageSquare, Calendar, Edit2, Plus } from 'lucide-react';

interface Note {
  id: number;
  content: string;
  createdAt: string;
  createdBy: string;
  stage: number;
}

interface CandidateDetailsProps {
  candidate: {
    id: number;
    name: string;
    role: string;
    skills: string[];
    experience: string;
    education: string;
    resumeText: string;
    notes?: Note[];
  };
  onUpdateNotes: (notes: Note[]) => void;
}

const stages = [
  { id: 1, name: 'Applied' },
  { id: 2, name: 'Phone Screen' },
  { id: 3, name: 'Interview' },
  { id: 4, name: 'Offer' },
  { id: 5, name: 'Hired' },
];

export const CandidateDetails: React.FC<CandidateDetailsProps> = ({ candidate, onUpdateNotes }) => {
  const [newNote, setNewNote] = useState('');
  const [selectedStage, setSelectedStage] = useState(1);
  const [localNotes, setLocalNotes] = useState<Note[]>(candidate.notes || []);

  useEffect(() => {
    setLocalNotes(candidate.notes || []);
  }, [candidate]);

  const handleAddNote = () => {
    if (newNote.trim()) {
      const newNoteObj: Note = {
        id: Date.now(),
        content: newNote.trim(),
        createdAt: new Date().toISOString(),
        createdBy: 'Current User', // Replace with actual user name
        stage: selectedStage,
      };
      const updatedNotes = [newNoteObj, ...localNotes];
      setLocalNotes(updatedNotes);
      onUpdateNotes(updatedNotes);
      setNewNote('');
      setSelectedStage(1); // Reset to default stage after adding a note
    }
  };

  const sortedNotes = [...localNotes].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold mb-2">{candidate.name}</h4>
        <p className="text-gray-600">{candidate.role}</p>
      </div>

      <div>
        <h5 className="font-semibold mb-2">Contact Options</h5>
        <div className="flex space-x-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
            <Phone size={18} className="mr-2" />
            Call
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
            <Mail size={18} className="mr-2" />
            Email
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded flex items-center">
            <MessageSquare size={18} className="mr-2" />
            Text
          </button>
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center">
            <Calendar size={18} className="mr-2" />
            Schedule
          </button>
        </div>
      </div>

      <div>
        <h5 className="font-semibold mb-2">Notes</h5>
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded mb-2"
            rows={3}
            placeholder="Add a new note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          ></textarea>
          <div className="flex items-center space-x-2">
            <select
              className="p-2 border rounded"
              value={selectedStage}
              onChange={(e) => setSelectedStage(Number(e.target.value))}
            >
              {stages.map((stage) => (
                <option key={stage.id} value={stage.id}>
                  {stage.name}
                </option>
              ))}
            </select>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handleAddNote}
              disabled={!newNote.trim()}
            >
              <Plus size={18} className="mr-2" />
              Add Note
            </button>
          </div>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {sortedNotes.map((note) => (
            <div key={note.id} className="bg-gray-100 p-3 rounded">
              <p>{note.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(note.createdAt).toLocaleString()} by {note.createdBy} | Stage: {stages.find(s => s.id === note.stage)?.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h5 className="font-semibold mb-2">CV</h5>
        <div className="bg-gray-100 p-4 rounded-md">
          <pre className="whitespace-pre-wrap font-mono text-sm">{candidate.resumeText}</pre>
        </div>
      </div>
    </div>
  );
};