import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function RegistrationSuccess() {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h2 className="mt-6 text-3xl font-bold text-gray-900">
        Registration Successful!
      </h2>
      <p className="mt-4 text-lg text-gray-600">
        Your registration has been successfully submitted.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        You will receive a confirmation email shortly with further details.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-8 inline-flex items-center rounded-md bg-[#0B56A3] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#094282]"
      >
        Register Another Member
      </button>
    </div>
  );
}