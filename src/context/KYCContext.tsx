'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for form data
interface BankDetails {
    accountHolderName:string;
  accountNumber: string;
  ifsc: string;
  branchName: string;
}

interface WithdrawalPreference {
  preference: string;
  datePreference: string;
  amount: string;
}

interface FormData {
  documentType: string;
  documentId: string;
  imageUrl: string;
  bankDetails: BankDetails;
  withdrawalPreference: WithdrawalPreference;
}

// Define the shape of the context
interface KYCContextType {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
}

// Create a context with a default value
const KYCContext = createContext<KYCContextType | undefined>(undefined);

// Custom hook to use the KYC context
export const useKYC = () => {
  const context = useContext(KYCContext);
  if (!context) {
    throw new Error('useKYC must be used within a KYCProvider');
  }
  return context;
};

// Provider to manage the form state globally
export const KYCProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    documentType: '',
    documentId: '',
    imageUrl: '',
    bankDetails: {accountHolderName:'', accountNumber: '', ifsc: '', branchName: '' },
    withdrawalPreference: { preference: '', datePreference: '', amount: '' },
  });

  // Function to update the form data
  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <KYCContext.Provider value={{ formData, updateFormData }}>
      {children}
    </KYCContext.Provider>
  );
};
