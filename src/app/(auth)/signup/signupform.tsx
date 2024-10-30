'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CardComponent from '@/components/card';

const SignupForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        
        if (!firstName) newErrors.firstName = "First name is required";
        if (!lastName) newErrors.lastName = "Last name is required";
        if (!mobileNo || mobileNo.length !== 10) newErrors.mobileNo = "Mobile number must be exactly 10 digits";
        if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) newErrors.email = "Invalid email format";
        if (!password) newErrors.password = "Password is required";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, mobileNo: `91${mobileNo}`, email, password }),
            });

            const result = await response.json();
            if (result.success) {
                if (result.token) {
                    localStorage.setItem('authToken', result.token);
                    router.push('/profiledetails');
                }
               
            } else {
                setErrors({ apiError: result.message || 'Sign up failed' });
            }
        } catch (error) {
            console.error(error);
            setErrors({ apiError: 'Sign up failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-[rgba(49,200,0,255)]">
            {/* Left section with image and message, hidden on small screens */}
            <div className="w-full md:w-1/2 hidden md:block relative overflow-hidden">
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
            <div className="w-full md:w-1/2 bg-background p-8 md:p-16 flex flex-col justify-center rounded-s-3xl relative">
                {/* Logo on top for small screens */}
                <div className="flex justify-center md:hidden mb-4">
                    <Image
                        src='/images/Nimbooo_Lime.png'
                        alt='Nimboo'
                        height={100}
                        width={100}
                        className='rounded-full'
                    />
                    
                </div>

                <div className="absolute top-4 right-4">
                    <Link href="/" className="text-primary">
                        Back to Home
                    </Link>
                </div>
                <div className="flex justify-center md:hidden mb-4">
                <h1 className="text-4xl font-bold text-primary">Welcome to Nimboo</h1>
                </div>
                <div className="rounded-xl border p-6 md:p-10">
                    <h1 className="text-2xl text-primary mb-4">Create your account</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* First Name */}
                        <div>
                            <label htmlFor="firstName" className="block mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`border p-2 w-full rounded-md ${errors.firstName ? 'border-red-600' : ''}`}
                            />
                            {errors.firstName && <p className="text-red-600">{errors.firstName}</p>}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="lastName" className="block mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`border p-2 w-full rounded-md ${errors.lastName ? 'border-red-600' : ''}`}
                            />
                            {errors.lastName && <p className="text-red-600">{errors.lastName}</p>}
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label htmlFor="mobileno" className="block mb-2">
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                id="mobileno"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                                maxLength={10}
                                required
                                className={`border p-2 w-full rounded-md ${errors.mobileNo ? 'border-red-600' : ''}`}
                            />
                            {errors.mobileNo && <p className="text-red-600">{errors.mobileNo}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`border p-2 w-full rounded-md ${errors.email ? 'border-red-600' : ''}`}
                            />
                            {errors.email && <p className="text-red-600">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={`border p-2 w-full rounded-md ${errors.password ? 'border-red-600' : ''}`}
                            />
                            {errors.password && <p className="text-red-600">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className={`border p-2 w-full rounded-md ${errors.confirmPassword ? 'border-red-600' : ''}`}
                            />
                            {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword}</p>}
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[rgba(49,200,0,255)] text-white p-4 rounded-lg mt-4"
                        >
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>

                        {errors.apiError && <p className="text-red-600 mt-4">{errors.apiError}</p>}
                    </form>

                    <Link href="/login" className="block mt-4 text-center">
                        Already have an account? <span className="text-[rgba(49,200,0,255)]">Login</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
