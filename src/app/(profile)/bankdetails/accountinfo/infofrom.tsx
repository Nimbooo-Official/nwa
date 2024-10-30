'use client';
import React, { useState } from 'react';
import { useKYC } from '@/context/KYCContext';
import { useRouter } from 'next/navigation';

const Step2 = () => {
  const { formData, updateFormData } = useKYC();
  const router = useRouter();

  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState(formData.bankDetails.accountNumber);
  const [confirmAccountNumber, setConfirmAccountNumber] = useState(''); // New state for confirmation
  const [ifsc, setIfsc] = useState(formData.bankDetails.ifsc);
  const [branchName, setBranchName] = useState(formData.bankDetails.branchName);
  
  const [errorMessages, setErrorMessages] = useState<string[]>([]); // State to hold error messages

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessages([]); // Reset error messages

    // Validation
    const newErrorMessages = [];
    if (!accountHolderName) newErrorMessages.push("Account Holder Name is required.");
    if (!accountNumber) newErrorMessages.push("Account Number is required.");
    if (accountNumber !== confirmAccountNumber) newErrorMessages.push("Account numbers do not match.");
    if (!ifsc) newErrorMessages.push("IFSC Code is required.");
    if (!branchName) newErrorMessages.push("Branch Name is required.");
    
    // Check if there are any errors
    if (newErrorMessages.length > 0) {
      setErrorMessages(newErrorMessages);
      return; // Stop submission if there are errors
    }

    // Update the form data
    updateFormData({
      bankDetails: { accountHolderName, accountNumber, ifsc, branchName },
    });

    console.log("formData", formData);

    // Mock API call to store data in the database
    // try {
    //   const response = await fetch('/api/kyc/bank-details', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       accountHolderName,
    //       accountNumber,
    //       ifsc,
    //       branchName,
    //     }),
    //   });

    //   if (response.ok) {
    //     // Navigate to the next step on success
        router.push('/bankdetails/paymentprefrence');
//       } else {
//         console.error('Failed to submit bank details');
//         // Optionally handle errors here
//       }
//     } catch (error) {
//       console.error('Error submitting bank details:', error);
//     }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Step 2: Bank Details</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Account Holder Name:</label>
          <input
            type="text"
            value={accountHolderName}
            onChange={(e) => setAccountHolderName(e.target.value)}
            placeholder="Enter Account Holder Name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Account Number:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter Account Number"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Confirm Account Number:</label>
          <input
            type="text"
            value={confirmAccountNumber}
            onChange={(e) => setConfirmAccountNumber(e.target.value)}
            placeholder="Re-enter Account Number"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {errorMessages.includes("Account numbers do not match.") && (
          <p className="text-red-600 text-sm mb-2">Account numbers do not match.</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">IFSC Code:</label>
          <input
            type="text"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
            placeholder="Enter IFSC Code"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Branch Name:</label>
          <input
            type="text"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            placeholder="Enter Branch Name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        
        {errorMessages.map((message, index) => (
          <p key={index} className="text-red-600 text-sm mb-2">{message}</p>
        ))}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Step2;
