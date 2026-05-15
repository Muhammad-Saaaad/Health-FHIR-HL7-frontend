import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import Sidebar from "../components/sidebar";
import Heading from "../components/heading";
import { complete_result, get_test_result } from "../api/result";
import error_response from "../api/error_response";

export default function LabResult() {
    const navigate = useNavigate();
    const { testReqId } = useParams();
    const { state } = useLocation();
    const userId = localStorage.getItem("user_id");
    const labId = localStorage.getItem("lab_id");

    // Load the saved/in-progress result for the selected test request.
    const { data, isLoading, isError } = useQuery({
        queryKey: ["lis_lab_result", testReqId],
        queryFn: () => get_test_result(testReqId),
        enabled: Boolean(testReqId),
    });

    const backendResult = data?.data;
    const testName = state?.test_name || backendResult?.test_name || "Lab Test";
    
    const templateRows = useMemo(() => { // useMemo to avoid rebuilding rows on every render, which would reset user edits.
        // Prefer backend mini-tests so users can continue editing existing values.
        const backendMiniTests = backendResult?.mini_test_results ?? backendResult?.mini_tests;

        if (backendMiniTests?.length) {
            return backendMiniTests.map((item) => ({
                mini_test_id: item?.mini_test_id,
                test_name: item?.test_name,
                normal_range: item?.normal_range,
                units: item?.units,
                result_value: item?.result_value ?? "",
            }));
        }

        return [];
    }, [backendResult]);

    const [description, setDescription] = useState("");
    const [miniTests, setMiniTests] = useState(templateRows);

    useEffect(() => {
        setDescription(backendResult?.description || "");
    }, [backendResult]);

    useEffect(() => {
        setMiniTests(templateRows);
    }, [templateRows]);


    const { mutate: handleSave, isPending: isSaving } = useMutation({
        mutationFn: () =>
            // Send only the fields the result completion API expects.
            complete_result({
                user_id: parseInt(userId),
                lab_id: labId,
                test_req_id: parseInt(testReqId),
                description: description,
                mini_tests: miniTests.map((item) => ({
                    test_name: item.test_name,
                    normal_range: item.normal_range,
                    units: item.units,
                    result_value: item.result_value,
                })),
            }),
        onSuccess: () => {
            alert("Result saved successfully!");
            navigate(-1);
        },
        onError: (error) => {
            error_response(error, "Failed to save result");
        },
    });

    const handleMiniTestChange = (index, value) => {
        // Keep row edits immutable so React reliably re-renders the table.
        setMiniTests((prev) =>
            prev.map((item, currentIndex) =>
                currentIndex === index ? { ...item, result_value: value } : item
            )
        );
    };

    const patientName = `${state?.fname ?? ""} ${state?.lname ?? ""}`.trim() || "Patient";

    return (
        <div className="flex min-h-screen overflow-hidden bg-[#F7F9FC]">
            <Sidebar />

            <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
                <div className="mb-4 flex items-center justify-center">
                    <Heading text="Test Result" />
                </div>

                <div className="mb-5 flex items-center gap-3">
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
                        <p className="text-sm text-red-600">Unable to load result data.</p>
                    </div>
                ) : isLoading ? (
                    <div className="max-w-4xl rounded-3xl border border-[#D6DCE8] bg-white p-5 shadow-sm sm:p-6">
                        <p className="text-sm text-[#7A7979]">Loading...</p>
                    </div>
                ) : (
                    <>
                        <section className="max-w-4xl rounded-3xl border border-[#D6DCE8] bg-white p-5 shadow-sm sm:p-6 mb-6">
                            <h2 className="text-lg font-bold text-[#152F5B] mb-3">{testName} Report Summary</h2>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Summary..."
                                className="min-h-36 w-full rounded-2xl border border-[#D6DCE8] p-4 text-sm text-[#152F5B] outline-none resize-none"
                            />
                        </section>

                        <section className="max-w-4xl rounded-3xl border border-[#D6DCE8] bg-white p-5 shadow-sm sm:p-6 mb-6">
                            <h2 className="text-lg font-bold text-[#152F5B] mb-4">Results</h2>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-150 border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-[#D6DCE8] text-left text-[#152F5B]">
                                            <th className="py-2 pr-3">Parameters</th>
                                            <th className="py-2 pr-3">Normal Range</th>
                                            <th className="py-2 pr-3">Units</th>
                                            <th className="py-2 pr-3">Results</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {miniTests.map((item, index) => (
                                            <tr key={item?.mini_test_id ?? `${item?.test_name}-${index}`} className="border-b border-[#EEF1F7]">
                                                <td className="py-3 pr-3 font-medium text-[#152F5B]">{item?.test_name}</td>
                                                <td className="py-3 pr-3 text-[#152F5B]">{item?.normal_range}</td>
                                                <td className="py-3 pr-3 text-[#152F5B]">{item?.units}</td>
                                                <td className="py-3 pr-3">
                                                    <input
                                                        type="text"
                                                        value={item?.result_value ?? ""}
                                                        onChange={(e) => handleMiniTestChange(index, e.target.value)}
                                                        className="w-full max-w-28 rounded-xl border border-[#A9A9A9] px-3 py-2 outline-none"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <div className="flex justify-center mb-6">
                            <button
                                type="button"
                                onClick={() => handleSave()}
                                disabled={isSaving}
                                className="px-8 py-3 bg-[#31486F] text-white font-semibold rounded-full hover:bg-[#243855] disabled:opacity-50 transition-colors"
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
