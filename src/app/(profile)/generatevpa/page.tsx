// components/CreateVirtualAccountForm.tsx
'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function CreateVirtualAccountForm() {
  const [formData, setFormData] = useState({
    virtualPaymentAddress: "",
  });
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('authToken');

    // Check if the token exists
    if (!token) {
      alert('You are not logged in. Redirecting to the login page.');
      router.push('/login'); // Redirect to login page
      return;
    }
  }, [router]);

  // Handle top-level form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation function for Virtual Payment Address length
  const validateVPA = (vpa: string) => {
    return vpa.length >= 8 && vpa.length <= 14;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null); // Clear previous messages

    // Validate Virtual Payment Address
    if (!validateVPA(formData.virtualPaymentAddress)) {
      setStatusMessage("Virtual Payment Address must be between 8 and 14 characters.");
      return;
    }

    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('You are not logged in. Redirecting to the login page.');
        router.push('/login');
        return;
      }

      const response = await fetch("/api/payment/createvpa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Send token in headers
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setStatusMessage("Virtual account created successfully!");
        const { username } = data; // Assuming response contains `{ username: string }`
        console.log('Username from response:', username);
  
        // Redirect to the user's profile page
        router.push(`/${username}/dashboard`);
       
      } else {
        setStatusMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.log(error);
      setStatusMessage("An error occurred while creating the account.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <label className="block mb-2">Virtual Payment Address</label>
      <input
        type="text"
        name="virtualPaymentAddress"
        value={formData.virtualPaymentAddress}
        className="w-full mb-4 p-2 border rounded bg-gray-800"
        onChange={handleChange}
      />

      <button type="submit" className="w-full p-2 bg-blue-600 rounded hover:bg-blue-500 mt-4">
        Create Account
      </button>

      {statusMessage && <p className="mt-4 text-center">{statusMessage}</p>}
    </form>
  );
}
