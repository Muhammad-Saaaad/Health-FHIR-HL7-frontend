import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Building } from "lucide-react";

import { login, get_all_insurances } from "../api/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import error_response from "../api/error_response";
import { InsuranceDropDown } from "../components/dropdown";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [insuranceId, setInsuranceId] = useState("");

    const navigate = useNavigate();

    const { mutate, isPending} = useMutation({
        mutationFn: login,
        onSuccess: (res)=> {
            navigate("/home");
            localStorage.setItem("user_id", res?.data?.user_id);
            localStorage.setItem("insurance_id", res?.data?.insurance_id);
        },
        onError: (error) =>{error_response(error, "Failed to Login")}
    });

    const { data: insurances } = useQuery({
        queryKey: ['all-insurances'],
        queryFn: get_all_insurances
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({
            email: email,
            password: password,
            insurance_id: insuranceId
        });
        console.log({ email, password, insurance_id: insuranceId });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-3xl shadow-sm px-8 py-12 w-full max-w-sm shadow-black/40">

                <h1 className="text-2xl font-bold text-center text-[#152F5B] mb-8">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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
                            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={() => setShowPass(p => !p)} className="text-gray-400">
                            {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>

                    {/* Insurance */}
                    <div className="flex items-center gap-3 border-2 border-[#E8F3F1] rounded-2xl px-4 ">
                        <Building size={18} className="text-gray-400 shrink-0" />
                        <div className="flex-1">
                            <InsuranceDropDown
                                options={insurances}
                                defaultValue={"Select Insurance"}
                                onSelect={(selectedInsurance) => setInsuranceId(selectedInsurance)}
                                required
                            />
                        </div>
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
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                            className="text-blue-500 font-semibold"
                        >
                            Sign up
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}
