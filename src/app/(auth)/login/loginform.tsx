'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CardComponent from '@/components/card';
import debounce from 'lodash/debounce';

const LoginForm = () => {
    const [mobileno, setMobileNo] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [isResendActive, setIsResendActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const sendOtp = async (mobileNumber: string) => {
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/sendotp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobileno: `91${mobileNumber}` }),
            });

            const data = await response.json();
            if (data.success) {
                setMessage('OTP sent to your mobile number. Please enter it below.');
                setOtpSent(true);
                setIsResendActive(false);
                setTimeout(() => setIsResendActive(true), 20000);
            } else {
                setError(data.message || 'Failed to generate OTP');
            }
        } catch (error) {
            console.error(error);
            setError('Error sending OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Debounced version of sendOtp that runs after 3 seconds
    const debouncedSendOtp = debounce(sendOtp, 3000);

    const handleMobileNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMobileNo(value);

        if (value.length === 10) {
            debouncedSendOtp(value); // Calls the debounced version directly
            setError('');
        } else if (value.length > 0) {
            setOtpSent(false);
            setMessage('');
            setError('Mobile number must be exactly 10 digits');
        } else {
            setError('');
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobileno: `91${mobileno}`, otp }),
            });

            const result = await response.json();
            if (result.success) {
                router.push(result.role === 'creator' ? '/creator' : '/user');
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (error) {
            console.error(error);
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex bg-[rgba(49,200,0,255)]">
            {/* Left section with image and message */}
            <div className="w-1/2 relative overflow-hidden">
                <div className="flex justify-center items-center mt-6">
                    <Image
                        src='/images/Nimbooo_Lime.png'
                        alt='Nimboo'
                        height={150}
                        width={150}
                        className='rounded-full'
                    />
                </div>
                <div className="relative z-10 p-10 text-white">
                    <h1 className="text-4xl font-bold">Welcome to Nimboo</h1>
                    <p className="mt-2 text-xl">Your personalized message here</p>
                </div>
                <CardComponent />
            </div>

            {/* Right section with form */}
            <div className="w-1/2 bg-background p-16 flex flex-col justify-center rounded-s-3xl relative">
                <div className="absolute top-4 right-4">
                    <Link href="/" className="text-primary">
                        Back to Home
                    </Link>
                </div>
                
                <div className="rounded-xl border p-10">
                    <h1 className="text-2xl text-primary mb-4">Welcome Back</h1>

                    {message && <p className="text-green-600 mb-4">{message}</p>}

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Mobile number input */}
                        <div>
                            <label htmlFor="mobileno" className="block mb-2">
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                id="mobileno"
                                value={mobileno}
                                onChange={handleMobileNoChange}
                                required
                                className={`border p-2 w-full rounded-md ${error ? 'border-red-600' : ''}`}
                                maxLength={10}
                            />
                            <div style={{ minHeight: '24px' }}>
                                {error && <p className="text-red-600">{error}</p>}
                            </div>
                        </div>

                        {/* OTP input field */}
                        <div>
                            <label htmlFor="otp" className="block mb-2">
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="border p-2 w-full rounded-md"
                            />
                        </div>
                        
                        {/* Login and Resend OTP buttons */}
                        <button
                            type="submit"
                            disabled={loading || !otp}
                            className="w-full bg-[rgba(49,200,0,255)] text-white p-4 rounded-lg mt-4"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                        {otpSent && (
                            <button
                                type="button"
                                onClick={() => sendOtp(mobileno)}
                                disabled={!isResendActive || loading}
                                className="w-full bg-gray-300 text-white p-4 rounded-lg mt-4 disabled:opacity-50"
                            >
                                {loading ? 'Resending...' : 'Resend OTP'}
                            </button>
                        )}
                    </form>

                    <Link href="/signup" className="block mt-4 text-center">
                        Don’t have an account? <span className="text-[rgba(49,200,0,255)]">Sign up</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;