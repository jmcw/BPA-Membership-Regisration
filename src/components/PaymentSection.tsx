import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Loader } from 'lucide-react';
import { submitMembership } from '../services/membership';
import { calculateTotalPrice } from '../utils/pricing';
import type { MembershipSubmission, PaymentMethod } from '../types/membership';

interface PaymentSectionProps {
  formData: any;
  merchandiseTotal?: number;
  extraShirtCost?: number;
  onBack: () => void;
  onComplete: () => void;
}

export default function PaymentSection({ 
  formData, 
  merchandiseTotal = 0,
  extraShirtCost = 0,
  onBack, 
  onComplete 
}: PaymentSectionProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paypal');
  const [checkMemo, setCheckMemo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = calculateTotalPrice(formData.membershipLevel, merchandiseTotal, extraShirtCost);

  const handleSubmitRequest = async (paypalTransactionId?: string) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const submissionData: MembershipSubmission = {
        ...formData,
        paymentMethod,
        checkMemo: paymentMethod === 'check' ? checkMemo : undefined,
        paypalTransactionId,
        total
      };

      await submitMembership(submissionData);
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit membership');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Registration Summary</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Membership Type</span>
            <span className="font-medium">{formData.membershipLevel}</span>
          </div>

          {merchandiseTotal > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Merchandise Total</span>
              <span className="font-medium">${merchandiseTotal.toFixed(2)}</span>
            </div>
          )}

          {extraShirtCost > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Extra Size Cost</span>
              <span className="font-medium">${extraShirtCost.toFixed(2)}</span>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setPaymentMethod('paypal')}
          className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all
            ${paymentMethod === 'paypal'
              ? 'border-secondary-300 bg-secondary-50 text-secondary-800'
              : 'border-gray-200 hover:border-secondary-200'
            }`}
        >
          PayPal
        </button>
        
        <button
          type="button"
          onClick={() => setPaymentMethod('check')}
          className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all
            ${paymentMethod === 'check'
              ? 'border-secondary-300 bg-secondary-50 text-secondary-800'
              : 'border-gray-200 hover:border-secondary-200'
            }`}
        >
          Check
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {paymentMethod === 'paypal' ? (
        <div className="mt-6">
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  description: `BPA Membership - ${formData.membershipLevel}`,
                  amount: {
                    currency_code: "USD",
                    value: total.toString(),
                    breakdown: {
                      item_total: {
                        currency_code: "USD",
                        value: total.toString()
                      }
                    }
                  },
                  items: [
                    {
                      name: `${formData.membershipLevel} Membership`,
                      quantity: "1",
                      unit_amount: {
                        currency_code: "USD",
                        value: total.toString()
                      }
                    }
                  ]
                }]
              });
            }}
            onApprove={async (data, actions) => {
              if (actions.order) {
                const order = await actions.order.capture();
                await handleSubmitRequest(order.id);
              }
            }}
          />
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="memo" className="block text-sm font-medium text-gray-700">
              Check Memo (Optional)
            </label>
            <textarea
              id="memo"
              rows={3}
              value={checkMemo}
              onChange={(e) => setCheckMemo(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-500 focus:ring-secondary-500 sm:text-sm"
              placeholder="Add any notes for your check payment..."
            />
          </div>
          <div className="bg-secondary-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-gray-900">Check Payment Instructions:</h3>
            <p className="mt-1 text-sm text-gray-600">
              Please make your check payable to "BPA" and mail it to:<br />
              BPA Membership Department<br />
              123 Game Street<br />
              Boardville, ST 12345
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Include your registration confirmation number with your payment.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleSubmitRequest()}
            disabled={isSubmitting}
            className="w-full rounded-md bg-[#0B56A3] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#094282] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Sending Request...
              </span>
            ) : (
              'Send Request'
            )}
          </button>
        </div>
      )}

      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Back
        </button>
      </div>
    </div>
  );
}