'use client';
import Image from 'next/image';
import { useState } from 'react';

interface DonationFormProps {
  userId: string;
  virtual:string
}

export default function DonationForm({ userId, virtual }: DonationFormProps ) {
  console.log('vpa.....',virtual)
  console.log('vpa.....',userId)
  const [numberInValue, setNumberInValue] = useState('');
  const [totalAmount, setTotalAmount] = useState(5); // Default total amount
  const [payerEmail, setPayerEmail] = useState('');
  const [payermobileno, setPayermobileno] = useState('');
  const [payerName, setPayerName] = useState('');
  const [description, setDescription] = useState('');
  const [emailVerified, setEmailVerified] = useState(true); // Email verification state
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup visibility state
  const [qrCode, setQrCode] = useState<string | null>(null); // QR code URL


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
      const res = await fetch('/api/payment/collectionrequest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          virtualAccountId:virtual,
          amount:totalAmount,
          email:payerEmail,
          phone:payermobileno,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert('we get the data');
        console.log("data",data)
        setQrCode(data.data.data.virtual_account.upi_qrcode_url);
        setIsPopupVisible(true);
      } else {
        alert(`Error: ${data.message || 'Failed to initiate payment'}`);
      }
    } catch (error) {
      console.error('Error creating collection request:', error);
      alert('An error occurred while processing your request. Please try again.');
    }

    // try {
    //   const res = await fetch('/api/donations/pay', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       userId,
    //       amount: totalAmount,
    //       payerEmail,
    //       payermobileno: `91${payermobileno}`,
    //       payerName,
    //       description,
    //     }),
    //   });

      // const data = await res.json();
      // console.log("Payment Data:", data);

      // if (res.ok) {
      //   alert('Payment Successful');
      // } else {
      //   alert(`Payment Failed: ${data.message}`);
      // }
    // } catch (error) {
    //   console.error('Error making payment:', error);
    // }
  };

  const verifyEmail = async () => {
    try {

      //  // Prevent default behavior to avoid form submission
      // await fetch('/api/auth/sendverifyemail', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({email: payerEmail }),
      // });
      // alert('Verification email sent!');
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
       {/* QR Code Popup */}
       {isPopupVisible && qrCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg text-center space-y-4">
            <h3 className="text-lg font-semibold">Scan QR Code to Pay</h3>
            <Image src={qrCode} alt="QR Code" width={200} height={200} />
            <button
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setIsPopupVisible(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}








//   // // Close popup on webhook response
//   // useEffect(() => {
//   //   const handleWebhook = async () => {
//   //     const eventSource = new EventSource('/api/webhooks/payment');
//   //     eventSource.onmessage = (event) => {
//   //       const data = JSON.parse(event.data);
//   //       if (data.status === 'paid') {
//   //         setIsPopupVisible(false);
//   //         alert('Payment successful!');
//   //         eventSource.close();
//   //       }
//   //     };

//   //     return () => eventSource.close();
//   //   };

//   //   handleWebhook();
//   // }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setNumberInValue(value);
//     const numericValue = parseInt(value, 10);

//     if (!isNaN(numericValue)) {
//       setTotalAmount(numericValue * 5);
//     } else {
//       setTotalAmount(0);
//     }
//   };

//   const verifyEmail = async () => {
//     // try {
//     //   await fetch('/api/auth/sendverifyemail', {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify({ email: payerEmail }),
//     //   });
//     //   alert('Verification email sent!');
//          setEmailVerified(true);
//     // } catch (error) {
//     //   console.error('Error sending email verification:', error);
//     // }
//   };

//   const handlePaymentInitiation = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!emailVerified) {
//       alert('Please verify your email before proceeding.');
//       return;
//     }

   
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
//       <form onSubmit={handlePaymentInitiation}>
//         {/* Donation Amount Section */}
//         <div className="mb-6">
//           <label className="block text-gray-700 font-semibold mb-2">Select Donation Amount</label>
//           <div className="flex items-center gap-4">
//             <Image
//               src="/images/Nimbooo_Lime.png"
//               alt="Nimbo"
//               width={30}
//               height={30}
//             />
//             <span>x</span>
//             {[1, 3, 5].map((value) => (
//               <button
//                 key={value}
//                 type="button"
//                 className="px-4 py-2 bg-green-100 border border-green-500 rounded hover:bg-green-200"
//                 onClick={() => { setNumberInValue(value.toString()); setTotalAmount(value * 5); }}>
//                 {value}
//               </button>
//             ))}
//             <input
//               className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
//               type="number"
//               placeholder="10"
//               onChange={handleChange}
//               value={numberInValue}
//             />
//           </div>
//         </div>

//         {/* User Details Section */}
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//               value={payerName}
//               onChange={(e) => setPayerName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Email</label>
//             <div className="flex gap-2">
//               <input
//                 type="email"
//                 className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//                 value={payerEmail}
//                 onChange={(e) => setPayerEmail(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 onClick={verifyEmail}>
//                 Verify
//               </button>
//             </div>
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Mobile Number</label>
//             <input
//               type="tel"
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//               value={payermobileno}
//               onChange={(e) => setPayermobileno(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Message</label>
//             <textarea
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//         </div>

//         <button
//           className="w-full mt-6 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
//           type="submit">
//           Pay ${totalAmount}
//         </button>
//       </form>

     
//     </div>
//   );
// }

