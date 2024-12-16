import React from 'react';
import { UserCheck } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
}

const CANDIDATES: Candidate[] = [
  {
    id: 'jane-smith',
    name: 'Jane Smith',
    position: 'Current Board Member',
    bio: 'Dedicated to expanding competitive gaming opportunities and fostering community growth.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'bob-dole',
    name: 'Bob Dole',
    position: 'Tournament Organizer',
    bio: 'Experienced in organizing large-scale gaming events and developing strategic initiatives.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'jake-glass',
    name: 'Jake Glass',
    position: 'Community Leader',
    bio: 'Focused on improving member experience and implementing innovative programs.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'brad-blue',
    name: 'Brad Blue',
    position: 'Strategy Expert',
    bio: 'Brings extensive experience in strategic planning and organizational development.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
  }
];

interface BoardVotingProps {
  selectedCandidate: string;
  onSelect: (candidateId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function BoardVoting({
  selectedCandidate,
  onSelect,
  onNext,
  onBack
}: BoardVotingProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold text-gray-900">Board of Directors Election</h2>
        <p className="mt-2 text-sm text-gray-500">
          Select one candidate for the Board of Directors position. Your vote helps shape the future of our organization.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {CANDIDATES.map((candidate) => (
          <div
            key={candidate.id}
            className={`relative rounded-lg border p-6 cursor-pointer transition-all
              ${selectedCandidate === candidate.id
                ? 'border-[#0B56A3] ring-2 ring-[#0B56A3]'
                : 'border-gray-300 hover:border-[#0B56A3]'
              }`}
            onClick={() => onSelect(candidate.id)}
          >
            <div className="flex items-start space-x-4">
              <img
                src={candidate.image}
                alt={candidate.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-medium text-gray-900">{candidate.name}</h3>
                <p className="text-sm text-[#0B56A3]">{candidate.position}</p>
                <p className="mt-2 text-sm text-gray-500">{candidate.bio}</p>
              </div>
              {selectedCandidate === candidate.id && (
                <UserCheck className="h-6 w-6 text-[#0B56A3]" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!selectedCandidate}
          className="rounded-md bg-[#0B56A3] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#094282] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}