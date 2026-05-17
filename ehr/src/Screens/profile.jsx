import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FileText, Phone, Info, LogOut, User } from "lucide-react";

import Sidebar from "../components/sidebar";
import { get_doctor } from "../api/doctor";

const FIELD_CONFIG = [
    {
        key: "specialization",
        title: "Specialization",
        icon: FileText,
    },
    {
        key: "phone_no",
        title: "Phone No",
        icon: Phone,
    },
    {
        key: "about",
        title: "About",
        icon: Info,
    },
];


export default function Profile() {
    const navigate = useNavigate();
    const doctorId = localStorage.getItem("doctor_id");
    const doctor = JSON.parse(localStorage.getItem("doctor"));


    const doctorName = doctor?.name ?? "";
    const profile = {
        specialization: doctor?.specialization ?? "No Specialization",
        phone_no: doctor?.phone_no ?? "No Number",
        about: doctor?.about ?? "No information available",
    };

    const handleLogout = () => {
        localStorage.removeItem("doctor_id");
        localStorage.removeItem("doctor");
        localStorage.removeItem("hospital_id");
        navigate("/login");
    };

    if (!doctorId) {
        return (
            <div className="flex min-h-screen bg-[#F7F9FC] md:overflow-hidden">
                <Sidebar />
                <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
                    <div className="mx-auto max-w-xl rounded-3xl border border-[#E5EAF2] bg-white p-6 shadow-sm">
                        <p className="text-sm text-[#7A7979]">Please log in again to view your profile.</p>
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="mt-4 rounded-full bg-[#31486F] px-5 py-2.5 text-sm font-semibold text-white"
                        >
                            Go to Login
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#FFFFFF] md:overflow-hidden">
            <Sidebar />

            <main className="flex-1 overflow-y-auto px-4 pb-8 pt-6 sm:px-6 md:px-8 md:py-8">
                <div className="mx-auto flex max-w-2xl flex-col items-center">
                    <div className="mt-1 flex flex-col items-center text-center">
                        <div className="h-24 w-24 flex items-center justify-center rounded-full border-4 border-white shadow-md bg-[#E9F1FF] text-[#2F6BFF]">
                            <User className="h-12 w-12" />
                        </div>
                        <p className="mt-4 text-lg font-semibold text-[#152F5B]">{doctorName || "—"}</p>
                    </div>

                    <div className="mt-8 w-full space-y-8 md:mt-10">
                        {FIELD_CONFIG.map((field) => {
                            const Icon = field.icon;
                            const value = profile[field.key] || "—";

                            return (
                                <section key={field.key} className="border-b border-[#EDF1F7] pb-6 last:border-b-0">
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E9F1FF] text-[#2F6BFF] shadow-[0_0_0_1px_rgba(47,107,255,0.06)]">
                                                <Icon className="h-5 w-5" strokeWidth={2} />
                                            </div>
                                            <h2 className="text-base font-semibold text-[#1F2937] sm:text-lg">{field.title}</h2>
                                        </div>
                                    </div>

                                    <div className="w-full rounded-2xl border border-[#E5EAF2] bg-[#FAFBFD] px-4 py-3 text-sm text-[#9AA3B2]">
                                        {value}
                                    </div>
                                </section>
                            );
                        })}

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 border-b border-[#EDF1F7] pb-6 text-left"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E9F1FF] text-[#2F6BFF] shadow-[0_0_0_1px_rgba(47,107,255,0.06)]">
                                <LogOut className="h-5 w-5" strokeWidth={2} />
                            </div>
                            <span className="text-base font-semibold text-[#1F2937] sm:text-lg">Logout</span>
                        </button>
                    </div>
                </div>
            </main>

            {/* Sidebar replaces bottom nav on all sizes per request */}
        </div>
    );
}