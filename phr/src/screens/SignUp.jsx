import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import { signup } from '../api/client';
import { AuthButton } from '../components/button';

export default function SignUp() {
    const [nic, setNic] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: signup, 

        onSuccess: () => {
            alert("Sign Up Sucessfully");
            navigate("/login");
        },
        onError: (error) => {
            alert(error?.response?.data?.detail || error?.message);
        }
    })

    const handleSignUp = (e) => {
        e.preventDefault();

        mutate({
            "nic": nic,
            "password": password
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
            <div className="flex-1 flex flex-col items-center px-8 pt-10">
                <h1 className="text-2xl font-bold text-gray-900 mb-9">Sign Up</h1>

                <form onSubmit={handleSignUp} className="w-full flex flex-col gap-4">
                    {/* NIC input */}
                    <div className="flex items-center bg-white rounded-xl px-4 h-13 shadow-sm gap-3">
                        <User size={20} className="text-gray-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Enter your NIC"
                            value={nic}
                            onChange={(e) => setNic(e.target.value)}
                            className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
                        />
                    </div>

                    {/* Password input */}
                    <div className="flex items-center bg-white rounded-xl px-4 h-13 shadow-sm gap-3">
                        <Lock size={20} className="text-gray-400 shrink-0" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-0 bg-transparent border-none cursor-pointer flex items-center"
                        >
                            {showPassword
                                ? <Eye size={20} className="text-gray-400" />
                                : <EyeOff size={20} className="text-gray-400" />
                            }
                        </button>
                    </div>

                    {/* Sign Up button */}
                    <AuthButton text="Sign Up" isProcessing={isPending} />
                </form>

                <p className="mt-5 text-sm text-gray-500">
                    Already have an account?{' '}
                    <span
                        className="text-blue-600 font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate('/login')}
                    >
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
}
