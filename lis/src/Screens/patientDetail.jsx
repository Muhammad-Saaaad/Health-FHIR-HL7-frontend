import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ChevronRight, FileText } from "lucide-react";

import Sidebar from "../components/sidebar";
import Heading from "../components/heading";
import { get_patient_detail } from "../api/patient";

export default function PatientDetail() {
    const navigate = useNavigate();
    const { nic } = useParams();
    const { state } = useLocation();
    const lab_id = localStorage.getItem("lab_id");

    
    const { data, isLoading, isError } = useQuery({
        queryKey: ["lis_patient_detail", nic, lab_id],
        queryFn: () => get_patient_detail(nic, lab_id),
        enabled: Boolean(nic),
    });

    const patient = data?.data;
    const patientName = patient
        ? `${patient?.fname ?? ""} ${patient?.lname ?? ""}`.trim()
        : `${state?.fname ?? ""} ${state?.lname ?? ""}`.trim();

    return (
        <div className="flex min-h-screen overflow-hidden bg-[#F7F9FC]">
            <Sidebar />

            <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
                <div className="mb-6 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D6DCE8] bg-white text-[#31486F] shadow-sm transition-colors hover:bg-slate-50"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <Heading text={patientName ? `Patient: ${patientName}` : "Patient Details"} />
                </div>

                <section className="max-w-4xl rounded-3xl border border-[#D6DCE8] bg-white p-5 shadow-sm sm:p-6">
                    <div className="grid gap-3 sm:grid-cols-3">
                        <div>
                            <p className="text-sm font-semibold text-[#31486F]">NIC:</p>
                            <p className="text-base text-[#7A7979]">{isLoading ? "Loading..." : patient?.nic ?? state?.nic ?? "-"}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#31486F]">Age:</p>
                            <p className="text-base text-[#7A7979]">{isLoading ? "Loading..." : patient?.age ?? "-"}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#31486F]">Gender:</p>
                            <p className="text-base text-[#7A7979]">{isLoading ? "Loading..." : patient?.gender ?? "-"}</p>
                        </div>
                    </div>
                </section>

                <div className="my-8 h-px max-w-4xl bg-[#D6DCE8]" />

                <div className="max-w-4xl">
                    <Heading text="Lab Reports" />

                    <section className="mt-5 rounded-3xl border border-[#D6DCE8] bg-white p-3 shadow-sm sm:p-4">
                        <div className="max-h-[55vh] space-y-3 overflow-y-auto pr-1 [scrollbar-gutter:stable]">
                            {isError ? (
                                <p className="px-2 py-3 text-sm text-red-600">Unable to load this patient.</p>
                            ) : isLoading ? (
                                <p className="px-2 py-3 text-sm text-[#7A7979]">Loading lab reports...</p>
                            ) : patient?.lab_reports?.length ? (
                                patient.lab_reports.map((report, index) => (
                                    <article
                                        key={report?.report_id ?? index}
                                        className="flex items-center justify-between rounded-2xl border border-[#D6DCE8] bg-white px-4 py-3 shadow-sm transition-colors hover:bg-slate-50"
                                        onClick={() => {
                                            navigate(`/view-report/${report?.report_id}`, {
                                                state: {
                                                    report_id: report?.report_id,
                                                    nic: patient?.nic ?? state?.nic,
                                                    fname: patient?.fname ?? state?.fname,
                                                    lname: patient?.lname ?? state?.lname,
                                                    test_name: report?.test_name,
                                                },
                                            });
                                        }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E9F1FF] text-[#2F6BFF]">
                                                <FileText className="h-7 w-7" strokeWidth={2} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-[#152F5B] sm:text-base">
                                                    {report?.test_name || "Lab Report"}
                                                </p>
                                                <p className="mt-1 text-sm text-[#7A7979]">VID: {report?.vid ?? "-"}</p>
                                                <p className="mt-1 text-sm font-medium text-[#7A7979]">
                                                    {report?.status ?? "Pending"}
                                                </p>
                                            </div>
                                        </div>

                                        <ChevronRight className="h-6 w-6 shrink-0 text-[#7A7979]" />
                                    </article>
                                ))
                            ) : (
                                <p className="px-2 py-3 text-sm text-[#7A7979]">No lab reports found for this patient.</p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}