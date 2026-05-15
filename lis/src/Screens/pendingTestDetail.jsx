import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import Sidebar from "../components/sidebar";
import Heading from "../components/heading";
import { get_patient_process, update_report_status } from "../api/patient";
import error_response from "../api/error_response";

export default function PendingTestDetail() {
    const navigate = useNavigate();
    const { nic, vid } = useParams();
    const { state } = useLocation();
    
    const [testStatuses, setTestStatuses] = useState({});
    const [testBills, setTestBills] = useState({});
    const userId = localStorage.getItem("user_id");

    // Fetch patient process data with pending tests
    const { data, isLoading, isError } = useQuery({
        queryKey: ["lis_pending_test_detail", nic, vid],
        queryFn: () => get_patient_process(nic, vid),
        enabled: Boolean(nic && vid),
    });

    const patient = data?.data;

    // Lock/unlock flow disabled for this screen.

    // Initialize test statuses from patient data
    useEffect(() => {
        if (patient?.lab_reports?.length) {
            const initialStatuses = {};
            const initialBills = {};
            patient.lab_reports.forEach((test) => {
                initialStatuses[test.report_id] = test.status || "Pending";
                initialBills[test.report_id] = 0;
            });
            setTestStatuses(initialStatuses);
            setTestBills(initialBills);
        }
    }, [patient]);

    // Mutation for updating test statuses
    const { mutate: handleSave, isPending: isSaving } = useMutation({
        mutationFn: () =>
            update_report_status({
                req_id_status: testStatuses,
                req_id_bill: testBills,
                user_id: parseInt(userId),
                visit_id: vid,
            }),
        onSuccess: () => {
            alert("Tests updated successfully!");
            navigate(-1);
        },
        onError: (error) => {
            error_response(error, "Failed to update test statuses");
        },
    });

    const handleStatusChange = (reportId, newStatus) => {
        setTestStatuses((prev) => ({
            ...prev,
            [reportId]: newStatus,
        }));
    };

    const handleBillChange = (reportId, amount) => {
        setTestBills((prev) => ({
            ...prev,
            [reportId]: parseFloat(amount) || 0,
        }));
    };

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
                    <Heading text={`Patient: ${patientName}`} />
                </div>

                {isError ? (
                    <div className="max-w-4xl rounded-3xl border border-[#D6DCE8] bg-white p-5 shadow-sm sm:p-6">
                        <p className="text-sm text-red-600">Unable to load patient details.</p>
                    </div>
                ) : isLoading ? (
                    <div className="max-w-4xl rounded-3xl border border-[#D6DCE8] bg-white p-5 shadow-sm sm:p-6">
                        <p className="text-sm text-[#7A7979]">Loading...</p>
                    </div>
                ) : (
                    <>
                        <section className="max-w-4xl rounded-3xl border border-[#D6DCE8] bg-white p-5 shadow-sm sm:p-6 mb-6">
                            <div className="grid gap-3 sm:grid-cols-4">
                                <div>
                                    <p className="text-sm font-semibold text-[#31486F]">NIC:</p>
                                    <p className="text-base text-[#7A7979]">{patient?.nic ?? state?.nic ?? "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#31486F]">VID:</p>
                                    <p className="text-base text-[#7A7979]">{vid ?? "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#31486F]">Gender:</p>
                                    <p className="text-base text-[#7A7979]">{patient?.gender ?? "-"}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#31486F]">Age:</p>
                                    <p className="text-base text-[#7A7979]">{patient?.age ?? "-"}</p>
                                </div>
                            </div>
                        </section>

                        <div className="max-w-4xl">
                            <Heading text="Lab Tests" />

                            <section className="mt-5 rounded-3xl border border-[#D6DCE8] bg-white p-3 shadow-sm sm:p-4 mb-6">
                                <div className="space-y-4">
                                    {patient?.lab_reports?.length ? (
                                        patient.lab_reports.map((test) => (
                                            <div
                                                key={test?.report_id}
                                                className="rounded-2xl border border-[#D6DCE8] bg-white px-4 py-4 shadow-sm"
                                            >
                                                <div className="grid gap-4 sm:grid-cols-3">
                                                    <div>
                                                        <p className="text-sm font-semibold text-[#152F5B]">
                                                            {test?.test_name || "Lab Test"}
                                                        </p>
                                                        <p className="text-sm text-[#7A7979] mt-1">Test Amount</p>
                                                        <input
                                                            type="number"
                                                            placeholder="0.00"
                                                            className="mt-2 w-full border border-[#D6DCE8] rounded-xl px-3 py-2 text-sm"
                                                            value={testBills[test?.report_id] || ""}
                                                            onChange={(e) => handleBillChange(test?.report_id, e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="sm:col-span-2">
                                                        <p className="text-sm font-semibold text-[#152F5B] mb-2">Status</p>
                                                        <div className="flex gap-2 flex-wrap">
                                                            {["Accepted", "Declined"].map((status) => (
                                                                <button
                                                                    key={status}
                                                                    type="button"
                                                                    onClick={() => handleStatusChange(test?.report_id, status)}
                                                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                                        testStatuses[test?.report_id] === status
                                                                            ? "bg-[#31486F] text-white"
                                                                            : "bg-[#E5E7EB] text-[#152F5B] hover:bg-[#D1D5DB]"
                                                                    }`}
                                                                >
                                                                    {status}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-[#7A7979]">No pending tests found.</p>
                                    )}
                                </div>
                            </section>

                            <div className="flex justify-center mb-6">
                                <button
                                    type="button"
                                    onClick={() => handleSave()}
                                    disabled={isSaving}
                                    className="px-8 py-3 bg-[#31486F] text-white font-semibold rounded-lg hover:bg-[#243855] disabled:opacity-50 transition-colors"
                                >
                                    {isSaving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
