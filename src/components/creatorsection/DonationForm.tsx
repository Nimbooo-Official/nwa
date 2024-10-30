'use client';
import Image from 'next/image';
import { useState } from 'react';

interface DonationFormProps {
  userId: string;
}

export default function DonationForm({ userId }: DonationFormProps) {
  const [numberInValue, setNumberInValue] = useState('');
  const [totalAmount, setTotalAmount] = useState(5); // Default total amount
  const [payerEmail, setPayerEmail] = useState('');
  const [payermobileno, setPayermobileno] = useState('');
  const [payerName, setPayerName] = useState('');
  const [description, setDescription] = useState('');

  const [emailVerified, setEmailVerified] = useState(false); // Email verification state
  // const [mobileVerified, setMobileVerified] = useState(false); // Mobile verification state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumberInValue(value);
    const numericValue = parseInt(value, 10);

    if (!isNaN(numericValue)) {
      setTotalAmount(numericValue * 5);
    } else {
      setTotalAmount(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailVerified ) {
      alert('Please verify your email and mobile number before proceeding.');
      return;
    }

    try {
      const res = await fetch('/api/donations/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          amount: totalAmount,
          payerEmail,
          payermobileno: `91${payermobileno}`,
          payerName,
          description,
        }),
      });

      const data = await res.json();
      console.log("Payment Data:", data);

      if (res.ok) {
        alert('Payment Successful');
      } else {
        alert(`Payment Failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };

  const verifyEmail = async () => {
    try {

       // Prevent default behavior to avoid form submission
      await fetch('/api/auth/sendverifyemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: payerEmail }),
      });
      alert('Verification email sent!');
      setEmailVerified(true)
    
    } catch (error) {
      console.error('Error sending email verification:', error);
    }
  };

 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="border border-[rgba(142,217,19,255)] bg-green-600/10 rounded-xl p-4 flex gap-2 items-center">
          <div>
            <Image
            src='/images/Nimbooo_Lime.png'
            alt='Nimbo'
            width={30}
            height={30}
            />
          </div>
          <span>x</span>
          <button
            type="button"
            onClick={() => { setNumberInValue('1'); setTotalAmount(1 * 5); }}
            className={"amount"}>
            1
          </button>
          <button
            type="button"
            onClick={() => { setNumberInValue('3'); setTotalAmount(3 * 5); }}
            className={"amount"}>
            3
          </button>
          <button
            type="button"
            onClick={() => { setNumberInValue('5'); setTotalAmount(5 * 5); }}
            className={"amount"}>
            5
          </button>
          <input
            className="w-12 h-12 border border-[rgba(49,200,0,255)] rounded-xl text-center"
            type="number"
            placeholder="10"
            onChange={handleChange}
            value={numberInValue}
          />
        </div>

        {/* Name, Email, and Message Fields */}
        <div className="mt-4">
          <div className="mb-4">
            <label className="block mb-2">Your Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <div className="flex gap-2">
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={payerEmail}
                onChange={(e) => setPayerEmail(e.target.value)}
                required
              />
              <button
                type="button"
                className=" bg-[rgba(49,200,0,255)] text-white px-4 py-2 rounded"
                onClick={verifyEmail}>
                Verify
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Mobile Number</label>
            <div className="flex gap-2">
              <input
                type="tel"
                className="w-full p-2 border rounded"
                value={payermobileno}
                onChange={(e) => setPayermobileno(e.target.value)}
                required
              />
              
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Message</label>
            <textarea
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-2">
          <button
            className=" bg-[rgba(49,200,0,255)] w-full rounded-xl py-2 font-semibold mt-5"
            type="submit"
          >
            Pay ${totalAmount}
          </button>
        </div>
      </form>
    </div>
  );
}
