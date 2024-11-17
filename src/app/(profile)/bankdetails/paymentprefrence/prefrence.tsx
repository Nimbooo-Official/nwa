'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKYC } from '@/context/KYCContext';
import { Button } from '@/components/ui/button';

const Step3 = () => {
  const { formData } = useKYC(); // Access formData to check for Step 1 and Step 2 data
  const router = useRouter();

  const [preference, setPreference] = useState('');
  const [datePreference, setDatePreference] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if Step 1 and Step 2 data is present
    if (!formData.documentType || !formData.documentId || !formData.imageUrl) {
      alert('Please complete Step 1: Personal Details');
      router.push('/auth/bankdetails'); // Redirect to Step 1
      return;
    }

    if (!formData.bankDetails.accountHolderName) {
      alert('Please complete Step 2: Bank Details');
      router.push('/auth/bankdetails/accountinfo'); // Redirect to Step 2
      return;
    }

    // Ensure a payment method has been chosen
    if (!preference) {
      alert('Please select a withdrawal preference');
      return;
    }

    // Check for specific preference fields
    if (preference === 'date-based' && !datePreference) {
      alert('Please select a date preference');
      return;
    }

    if (preference === 'amount-based' && !amount) {
      alert('Please enter an amount');
      return;
    }

    // Retrieve the token from local storage
    const token = localStorage.getItem('authToken');

    // Check if the token exists
    if (!token) {
      alert('You are not logged in. Redirecting to the login page.');
      router.push('/login'); // Redirect to login page
      return;
    }

    // Store all data to the database
    try {
      const response = await fetch('/api/profile/savebankdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token, // Send token in the request body
          personalDetails: {
            documentType: formData.documentType,
            documentId: formData.documentId,
            imageUrl: formData.imageUrl,
          },
          bankDetails: formData.bankDetails,
          withdrawalPreference: {
            preference,
            datePreference,
            amount,
          },
        }),
      });

      if (response.ok) {

        router.push('/generateVpa')
       
      
      } else {
        console.error('Failed to store data:', await response.json());
        alert('Error storing data, please try again.');
      }
    } catch (error) {
      console.error('Error storing data:', error);
      alert('An error occurred while processing your request. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">KYC Step 3: Withdrawal Preference</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Choose Withdrawal Preference</label>
          <select
            name="preference"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="date-based">Date-based</option>
            <option value="amount-based">Amount-based</option>
          </select>
        </div>

        {preference === 'date-based' && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Choose Date</label>
            <select
              value={datePreference}
              onChange={(e) => setDatePreference(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a date</option>
              <option value="1">1st</option>
              <option value="11">11th</option>
              <option value="21">21st</option>
              <option value="30">30th</option>
            </select>
          </div>
        )}

        {preference === 'amount-based' && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Enter Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        )}

        <Button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
          Copmlite KYC
        </Button>
      </form>
    </div>
  );
};

export default Step3;
