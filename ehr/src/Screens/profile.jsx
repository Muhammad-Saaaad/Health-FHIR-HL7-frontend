import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FileText, Phone, Info, LogOut, User } from "lucide-react";

import Sidebar from "../components/sidebar";
import { get_doctor } from "../api/doctor";

const FIELD_CONFIG = [
    {
        key: "specialization",
        title: "Specialization",
        editLabel: "+ Edit Specialization",
        icon: FileText,
        placeholder: "Medical Specialist",
        maxLength: 50,
    },
    {
        key: "phone_no",
        title: "Phone No",
        editLabel: "+ Edit Phone No",
        icon: Phone,
        placeholder: "+92-320-5996162",
        maxLength: 15,
    },
    {
        key: "about",
        title: "About",
        editLabel: "+ Edit About",
        icon: Info,
        placeholder: "I am a medical specialist dedicated to diagnosing and treating patients with high-quality, evidence-based care.",
        maxLength: 60,
    },
];

function getInitialDraft(doctor) {
    return {
        specialization: doctor?.specialization ?? doctor?.speciality ?? doctor?.specialty ?? "Medical Specialist",
        phone_no: doctor?.phone_no ?? doctor?.phone ?? "+92-320-5996162",
        about: doctor?.about ?? doctor?.bio ?? "I am a medical specialist dedicated to diagnosing and treating patients with high-quality, evidence-based care.",
    };
}

export default function Profile() {
    const navigate = useNavigate();
    const doctorId = localStorage.getItem("doctor_id");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["ehr_doctor_profile", doctorId],
        queryFn: () => get_doctor(doctorId),
        enabled: Boolean(doctorId),
    });

    const doctor = data?.data;
    const doctorName = doctor?.doc_name ?? doctor?.name ?? doctor?.doctor_name ?? doctor?.fname ?? "Dr.Sana";

    const [draft, setDraft] = useState(() => getInitialDraft(null));
    const [savedProfile, setSavedProfile] = useState(() => getInitialDraft(null));
    const [editing, setEditing] = useState({
        specialization: false,
        phone_no: false,
        about: false,
    });

    useEffect(() => {
        const initialProfile = getInitialDraft(doctor);
        setDraft(initialProfile);
        setSavedProfile(initialProfile);
        setEditing({ specialization: false, phone_no: false, about: false });
    }, [doctor]);

    const notificationCount = 2;

    const handleEdit = (fieldKey) => {
        setEditing((prev) => ({ ...prev, [fieldKey]: true }));
    };

    const handleCancel = (fieldKey) => {
        setDraft((prev) => ({ ...prev, [fieldKey]: savedProfile[fieldKey] }));
        setEditing((prev) => ({ ...prev, [fieldKey]: false }));
    };

    const handleSave = (fieldKey) => {
        setSavedProfile((prev) => ({ ...prev, [fieldKey]: draft[fieldKey] }));
        setEditing((prev) => ({ ...prev, [fieldKey]: false }));
    };

    const handleLogout = () => {
        localStorage.removeItem("doctor_id");
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
                        <p className="mt-4 text-lg font-semibold text-[#152F5B]">{doctorName}</p>
                    </div>

                    <div className="mt-8 w-full space-y-8 md:mt-10">
                        {FIELD_CONFIG.map((field) => {
                            const Icon = field.icon;
                            const isEditing = editing[field.key];

                            return (
                                <section key={field.key} className="border-b border-[#EDF1F7] pb-6 last:border-b-0">
                                    <div className="mb-4 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E9F1FF] text-[#2F6BFF] shadow-[0_0_0_1px_rgba(47,107,255,0.06)]">
                                                <Icon className="h-5 w-5" strokeWidth={2} />
                                            </div>
                                            <h2 className="text-base font-semibold text-[#1F2937] sm:text-lg">{field.title}</h2>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleEdit(field.key)}
                                            className="text-xs font-semibold text-[#31486F] sm:text-sm"
                                        >
                                            {field.editLabel}
                                        </button>
                                    </div>

                                    <input
                                        type="text"
                                        maxLength={field.maxLength}
                                        value={draft[field.key]}
                                        onChange={(e) => setDraft((prev) => ({ ...prev, [field.key]: e.target.value }))}
                                        disabled={!isEditing}
                                        placeholder={field.placeholder}
                                        className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-colors ${
                                            isEditing
                                                ? "border-[#D6DCE8] bg-white text-[#152F5B]"
                                                : "border-[#E5EAF2] bg-[#FAFBFD] text-[#9AA3B2]"
                                        }`}
                                    />

                                    <div className="mt-2 text-right text-[11px] text-[#A1A1A1] sm:text-xs">
                                        {draft[field.key].length}/{field.maxLength} Characters
                                    </div>

                                    <div className="mt-1 flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleCancel(field.key)}
                                            className="rounded-lg bg-[#E5E7EB] px-3 py-1.5 text-xs font-semibold text-[#7A7979] shadow-sm transition-colors hover:bg-[#D1D5DB]"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleSave(field.key)}
                                            className="rounded-lg bg-[#31486F] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#243855]"
                                        >
                                            Save
                                        </button>
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