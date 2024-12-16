import React from 'react';
import { Vote } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import type { Event } from '../types/event';

interface TrialEventVotingProps {
  selectedEvents: string[];
  onSelect: (eventId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function TrialEventVoting({
  selectedEvents,
  onSelect,
  onNext,
  onBack
}: TrialEventVotingProps) {
  const { events, loading, error } = useEvents();

  const handleEventSelect = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      onSelect(eventId); // Will remove it
    } else if (selectedEvents.length < 5) {
      onSelect(eventId); // Will add it
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B56A3]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">Unable to load events at this time. Please try again later.</p>
        <button
          onClick={onBack}
          className="mt-4 rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold text-gray-900">Trial Event Voting</h2>
        <p className="mt-2 text-sm text-gray-500">
          Select up to 5 events you would like to see at the next WBC. Your votes help determine which events will be included.
        </p>
        <div className="mt-4 flex items-center">
          <div className="flex items-center space-x-2">
            <Vote className="h-5 w-5 text-[#FFCF8C]" />
            <span className="text-sm font-medium text-gray-700">
              {selectedEvents.length} of 5 votes used
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event: Event) => (
          <div
            key={event.id}
            onClick={() => handleEventSelect(event.id)}
            className={`relative rounded-lg border p-4 cursor-pointer transition-all
              ${selectedEvents.includes(event.id)
                ? 'border-[#FFCF8C] bg-[#FFF8EC] ring-1 ring-[#FFCF8C]'
                : 'border-gray-200 hover:border-[#FFCF8C]'
              }
              ${selectedEvents.length >= 5 && !selectedEvents.includes(event.id)
                ? 'opacity-50 cursor-not-allowed'
                : ''
              }`}
          >
            <div className="flex justify-between">
              <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
              <span className="inline-flex items-center rounded-full bg-[#FFF8EC] px-2.5 py-0.5 text-xs font-medium text-[#B38A45]">
                {event.category}
              </span>
            </div>
            <div 
              className="mt-1 text-sm text-gray-500"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>{event.duration}</span>
              <span>{event.minPlayers}-{event.maxPlayers} players</span>
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
          className="rounded-md bg-[#0B56A3] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#094282]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}