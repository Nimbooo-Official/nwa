'use client';
import React, { useState, useEffect } from 'react';
import { useKYC } from '@/context/KYCContext';
import { useRouter } from 'next/navigation';
import UploadButton from '@/components/profilesection/imageuploadbutton';
import Image from "next/image";

const Step1 = () => {
  const { formData, updateFormData } = useKYC();
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [documentType, setDocumentType] = useState(formData.documentType);
  const [documentId, setDocumentId] = useState(formData.documentId);
  const [errors, setErrors] = useState<{ documentType?: string; documentId?: string; imageUrl?: string }>({});

  // Check for authentication in useEffect to avoid conditional hook call
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You are not logged in. Redirecting to the login page.');
      router.push('/auth/login'); // Redirect to login page
    }
  }, [router]); // Empty dependency array ensures this runs only once

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});

    // Validate fields
    let valid = true;
    if (!documentType) {
      setErrors((prev) => ({ ...prev, documentType: 'Document type is required.' }));
      valid = false;
    }
    if (!documentId) {
      setErrors((prev) => ({ ...prev, documentId: 'Document ID is required.' }));
      valid = false;
    }
    if (!imageUrl) {
      setErrors((prev) => ({ ...prev, imageUrl: 'Document image is required.' }));
      valid = false;
    }

    // If valid, update form data and navigate
    if (valid) {
      updateFormData({ documentType, documentId, imageUrl });
      router.push('  /bankdetails/accountinfo');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">KYC Details</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Document Type:</label>
          <select
            className={`w-full p-2 border ${errors.documentType ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="">Select Document</option>
            <option value="aadhaar">Aadhaar</option>
            <option value="passport">Passport</option>
            <option value="license">License</option>
            <option value="Pancard">Pancard</option>
          </select>
          {errors.documentType && <p className="text-red-500 text-sm">{errors.documentType}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Document ID:</label>
          <input
            type="text"
            className={`w-full p-2 border ${errors.documentId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
            placeholder="Enter Document ID"
          />
          {errors.documentId && <p className="text-red-500 text-sm">{errors.documentId}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Upload Document Images:</label>
          <UploadButton onUplodeComplete={setImageUrl} />
          {imageUrl && ( // Conditional rendering of the Image component
            <div className="h-40 w-auto overflow-hidden rounded-xl border-4 border-white">
              <Image
                src={imageUrl} // Display the uploaded image
                width={246}
                height={246}
                alt="Uploaded Document"
                className="h-40 w-auto object-cover object-center"
              />
            </div>
          )}
          {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}
        </div>

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

export default Step1;
