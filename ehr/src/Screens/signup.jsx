import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

import { signup } from "../api/doctor";
import error_response from "../api/error_response";

export default function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const navigate = useNavigate();

    const { mutate, isPending} = useMutation({
        mutationFn: signup,
        onSuccess: () => {
            alert("SignUp Completed");
            navigate("/login");
        },
        onError: (error)=>{error_response(error, "Failed to SignUP")}
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        mutate({
            name: name,
            email: email,
            password: password
        });

        console.log({name, email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-3xl shadow-sm px-8 py-12 w-full max-w-sm shadow-black/40">

                <h1 className="text-2xl font-bold text-center text-[#152F5B] mb-8">Sign Up</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* name */}
                    <div className="flex items-center gap-3 border-2 border-[#E8F3F1] rounded-2xl px-4 py-3">
                        <User size={18} className="text-gray-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    
                    {/* Email */}
                    <div className="flex items-center gap-3 border-2 border-[#E8F3F1] rounded-2xl px-4 py-3">
                        <Mail size={18} className="text-gray-400 shrink-0" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex items-center gap-3 border-2 border-[#E8F3F1] rounded-2xl px-4 py-3">
                        <Lock size={18} className="text-gray-400 shrink-0" />
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder="Enter your password"
                            // flex-1 means the input will take up all available space, pushing the button to the end
                            // where flex-2 means the input will take up twice as much space as the button, which is not what we want here
                            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={() => setShowPass(p => !p)} className="text-gray-400">
                            {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3 rounded-full transition-colors"
                        >
                            {isPending ? "Loading" : "Sign In"}
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-1">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-blue-500 font-semibold"
                        >
                            Sign Up
                        </button>
                    </p>

                </form>
            </div>
        </div>
    );
}
