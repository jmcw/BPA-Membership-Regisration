import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import MembershipForm from './components/MembershipForm';
import ErrorFallback from './components/ErrorFallback';

const paypalOptions = {
  "client-id": "AQIh-wB89QILy4GigkbUpHI7ytT_BgvIO735nXwkKOFFHdLo2Jd24HnrAsZCt-7sgGt4UH42SFA5Hb3P",
  currency: "USD",
  intent: "capture"
};

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PayPalScriptProvider options={paypalOptions}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-[#0B56A3] text-white py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold">BPA Membership Registration</h1>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <MembershipForm />
          </main>
        </div>
      </PayPalScriptProvider>
    </ErrorBoundary>
  );
}

export default App;