// components/CreateVirtualAccountForm.tsx
'use client'
import { useState } from "react";

export default function CreateVirtualAccountForm() {
  const [formData, setFormData] = useState({
    uniqueRequestNumber: "",
    label: "",
    description: "",
    virtualAccountNumber: "",
    virtualPaymentAddress: "",
    autoDeactivateAt: "",
    authorizedRemitters: [{ accountNumber: "", accountIfsc: "" }],
    transactionAmountLimit: { imps: 0, neft: 0, rtgs: 0 },
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Handle top-level form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle nested transactionAmountLimit changes
  const handleTransactionAmountLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      transactionAmountLimit: { ...prev.transactionAmountLimit, [name]: Number(value) },
    }));
  };

  // Handle array updates for authorizedRemitters
  const handleRemitterChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedRemitters = [...prev.authorizedRemitters];
      updatedRemitters[index] = { ...updatedRemitters[index], [name]: value };
      return { ...prev, authorizedRemitters: updatedRemitters };
    });
  };

  // Add a new remitter to the list
  const addRemitter = () => {
    setFormData((prev) => ({
      ...prev,
      authorizedRemitters: [...prev.authorizedRemitters, { accountNumber: "", accountIfsc: "" }],
    }));
  };

  // Remove a remitter from the list
  const removeRemitter = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      authorizedRemitters: prev.authorizedRemitters.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null); // Clear previous messages

    try {
      const response = await fetch("/api/payment/createvpa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setStatusMessage("Virtual account created successfully!");
        setFormData({
          uniqueRequestNumber: "",
          label: "",
          description: "",
          virtualAccountNumber: "",
          virtualPaymentAddress: "",
          autoDeactivateAt: "",
          authorizedRemitters: [{ accountNumber: "", accountIfsc: "" }],
          transactionAmountLimit: { imps: 0, neft: 0, rtgs: 0 },
        });
      } else {
        setStatusMessage(`Error: ${data.error}`);
      }
    } catch (error) {
        console.log(error)
      setStatusMessage("An error occurred while creating the account.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Virtual Account</h2>

      {statusMessage && <p className="mb-4 text-center">{statusMessage}</p>}

      <label className="block mb-2">Unique Request Number</label>
      <input
        type="text"
        name="uniqueRequestNumber"
        value={formData.uniqueRequestNumber}
        className="w-full mb-4 p-2 border rounded bg-gray-800"
        onChange={handleChange}
      />

      <label className="block mb-2">Label</label>
      <input
        type="text"
        name="label"
        value={formData.label}
        className="w-full mb-4 p-2 border rounded bg-gray-800"
        onChange={handleChange}
      />

      <label className="block mb-2">Description</label>
      <input
        type="text"
        name="description"
        value={formData.description}
        className="w-full mb-4 p-2 border rounded bg-gray-800"
        onChange={handleChange}
      />

      <label className="block mb-2">Virtual Account Number</label>
      <input
        type="text"
        name="virtualAccountNumber"
        value={formData.virtualAccountNumber}
        className="w-full mb-4 p-2 border rounded bg-gray-800"
        onChange={handleChange}
      />

      <label className="block mb-2">Virtual Payment Address</label>
      <input
        type="text"
        name="virtualPaymentAddress"
        value={formData.virtualPaymentAddress}
        className="w-full mb-4 p-2 border rounded bg-gray-800"
        onChange={handleChange}
      />

      <label className="block mb-2">Auto Deactivate At</label>
      <input
        type="date"
        name="autoDeactivateAt"
        value={formData.autoDeactivateAt}
        className="w-full mb-4 p-2 border rounded bg-gray-800"
        onChange={handleChange}
      />

      <h3 className="text-xl font-semibold mt-4 mb-2">Transaction Amount Limit</h3>
      <label className="block mb-2">IMPS Limit</label>
      <input
        type="number"
        name="imps"
        value={formData.transactionAmountLimit.imps}
        className="w-full mb-4 p-2 border rounded bg-gray-800"
        onChange={handleTransactionAmountLimitChange}
      />

      <label className="block mb-2">NEFT Limit</label>
      <input
        type="number"
        name="neft"
        value={formData.transactionAmountLimit.neft}
        className="w-full mb-4 p-2 border rounded bg-gray-800"
        onChange={handleTransactionAmountLimitChange}
      />

      <label className="block mb-2">RTGS Limit</label>
      <input
        type="number"
        name="rtgs"
        value={formData.transactionAmountLimit.rtgs}
        className="w-full mb-4 p-2 border rounded bg-gray-800"
        onChange={handleTransactionAmountLimitChange}
      />

      <h3 className="text-xl font-semibold mt-4 mb-2">Authorized Remitters</h3>
      {formData.authorizedRemitters.map((remitter, index) => (
        <div key={index} className="mb-4">
          <label className="block">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={remitter.accountNumber}
            className="w-full mb-2 p-2 border rounded bg-gray-800"
            onChange={(e) => handleRemitterChange(index, e)}
          />

          <label className="block">Account IFSC</label>
          <input
            type="text"
            name="accountIfsc"
            value={remitter.accountIfsc}
            className="w-full mb-2 p-2 border rounded bg-gray-800"
            onChange={(e) => handleRemitterChange(index, e)}
          />

          <button
            type="button"
            className="text-red-500 mt-2"
            onClick={() => removeRemitter(index)}
          >
            Remove Remitter
          </button>
        </div>
      ))}
      <button
        type="button"
        className="w-full p-2 bg-green-600 rounded hover:bg-green-500 mt-4"
        onClick={addRemitter}
      >
        Add Remitter
      </button>

      <button type="submit" className="w-full p-2 bg-blue-600 rounded hover:bg-blue-500 mt-4">
        Create Account
      </button>
    </form>
  );
}
