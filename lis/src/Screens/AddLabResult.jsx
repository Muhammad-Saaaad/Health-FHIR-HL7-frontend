import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import Sidebar from "../components/sidebar";
import Heading from "../components/heading";
import { complete_result, get_test_parameters } from "../api/result";
import error_response from "../api/error_response";

export default function AddLabResult() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const userId = localStorage.getItem("user_id");
    const labId = localStorage.getItem("lab_id");
    const [test_code, setTestCode] = useState("");
    
    const testReqId = state?.test_req_id;
    const nic = state?.nic;
    const testName = state?.test_name || "Lab Test";

    const { data, isLoading, isError } = useQuery({
        queryKey: ["lis_lab_result", nic, testReqId, testName],
        queryFn: () => get_test_parameters({ nic, test_req_id: testReqId, test_name: testName }),
        enabled: Boolean(nic && testReqId && testName),
        retry: false,
    });

    const testParameters = data?.data;

    const [description, setDescription] = useState("");
    const [miniTests, setMiniTests] = useState([]);

    useEffect(() => { // first we will add all the test without result_value and when we get the result_value we will update the miniTests state with the result_value.
        if (testParameters?.length) {
            setMiniTests(testParameters.map((p) => ({ ...p, result_value: "" })));
            setTestCode(testParameters[0]?.test_code || "");
        }
    }, [testParameters]);

    const { mutate: save_result, isPending: isSaving } = useMutation({
        mutationFn: complete_result,
        onSuccess: () => {
            alert("Result saved successfully!");
            navigate(-1);
        },
        onError: (error) => {
            error_response(error, "Failed to save result");
        },
    });

    function handleSubmit(){
        if (!userId) {
            alert("Please log in again before saving the result.");
            return;
        }
        if (!test_code || test_code.trim() === "") {
            alert("Test code is missing. Cannot save result.");
            return;
        }
        
        const payload = {
            user_id: parseInt(userId),
            lab_id: labId,
            test_req_id: parseInt(testReqId),
            test_code: test_code,
            description: description,
            mini_tests: miniTests.map((item) => ({
                test_name: item.parameter,
                normal_range: item.test_range,
                units: item.unit,
                result_value: item.result_value,
            })),
        };
        console.log("Submitting payload:", payload);
        save_result(payload);
    }

    const handleMiniTestChange = (index, value) => {
        setMiniTests((prev) => // here we are updateing the miniTests state with the result_value, we are using the index to find the correct test and update its result_value.
            prev.map((test, i) => (i === index ? { ...test, result_value: value } : test))
        );
    };

    const patientName = `${state?.fname ?? ""} ${state?.lname ?? ""}`.trim() || "Patient";

    return (
        <div className="flex min-h-screen overflow-hidden bg-[#F7F9FC]">
            <Sidebar />

            <main className="flex-1 overflow-y-auto px-3 py-4 sm:px-6 sm:py-6">
                {/* Page title */}
                <div className="mb-4 flex items-center justify-center">
                    <Heading text="Test Result" />
                </div>

                {/* Back + patient name */}
                <div className="mb-5 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D6DCE8] bg-white text-[#31486F] shadow-sm transition-colors hover:bg-slate-50"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <h2 className="truncate text-base font-bold text-[#152F5B] sm:text-xl">
                        Patient: {patientName}
                    </h2>
                </div>

                {isError ? (
                    <div className="max-w-4xl rounded-2xl border border-[#D6DCE8] bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
                        <p className="text-sm text-red-600">Unable to load result data.</p>
                    </div>
                ) : isLoading ? (
                    <div className="max-w-4xl rounded-2xl border border-[#D6DCE8] bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
                        <p className="text-sm text-[#7A7979]">Loading...</p>
                    </div>
                ) : (
                    <>
                        {/* Summary section */}
                        <section className="mb-4 max-w-4xl rounded-2xl border border-[#D6DCE8] bg-white p-4 shadow-sm sm:mb-6 sm:rounded-3xl sm:p-6">
                            <h2 className="mb-3 text-base font-bold text-[#152F5B] sm:text-lg">
                                {testName} Report Summary
                            </h2>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Summary..."
                                className="min-h-28 w-full resize-none rounded-xl border border-[#D6DCE8] p-3 text-sm text-[#152F5B] outline-none sm:min-h-36 sm:rounded-2xl sm:p-4"
                            />
                        </section>

                        {/* Results section */}
                        <section className="mb-4 max-w-4xl rounded-2xl border border-[#D6DCE8] bg-white p-4 shadow-sm sm:mb-6 sm:rounded-3xl sm:p-6">
                            <h2 className="mb-4 text-base font-bold text-[#152F5B] sm:text-lg">Results</h2>

                            {/* Mobile: stacked cards — hidden on md+ */}
                            <div className="flex flex-col gap-3 md:hidden">
                                {testParameters?.map((item, index) => (
                                    <div
                                        key={item?.test_id ?? `${item?.parameter}-${index}`}
                                        className="rounded-xl border border-[#EEF1F7] bg-[#F7F9FC] p-4"
                                    >
                                        <p className="mb-3 font-semibold text-[#152F5B]">
                                            {item?.parameter || "—"}
                                        </p>
                                        <div className="mb-1 flex justify-between text-sm">
                                            <span className="text-[#7A7979]">Normal Range</span>
                                            <span className="text-[#152F5B]">{item?.test_range || "—"}</span>
                                        </div>
                                        <div className="mb-3 flex justify-between text-sm">
                                            <span className="text-[#7A7979]">Units</span>
                                            <span className="text-[#152F5B]">{item?.unit || "—"}</span>
                                        </div>
                                        <input
                                            type="text"
                                            // value={""}
                                            onChange={(e) => handleMiniTestChange(index, e.target.value)}
                                            placeholder="Enter result..."
                                            className="w-full rounded-xl border border-[#A9A9A9] bg-white px-3 py-2 text-sm outline-none"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Desktop: table — hidden on mobile */}
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full border-collapse text-sm">
                                    <thead>
                                        <tr className="border-b border-[#D6DCE8] text-left text-[#152F5B]">
                                            <th className="py-2 pr-4 font-semibold">Parameters</th>
                                            <th className="py-2 pr-4 font-semibold">Normal Range</th>
                                            <th className="py-2 pr-4 font-semibold">Units</th>
                                            <th className="py-2 font-semibold">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {testParameters?.map((item, index) => (
                                            <tr
                                                key={item?.test_id ?? `${item?.parameter}-${index}`}
                                                className="border-b border-[#EEF1F7]"
                                            >
                                                <td className="py-3 pr-4 font-medium text-[#152F5B]">{item?.parameter}</td>
                                                <td className="py-3 pr-4 text-[#152F5B]">{item?.test_range || "—"}</td>
                                                <td className="py-3 pr-4 text-[#152F5B]">{item?.unit || "—"}</td>
                                                <td className="py-3">
                                                    <input
                                                        type="text"
                                                        // value={""}
                                                        onChange={(e) => handleMiniTestChange(index, e.target.value)}
                                                        placeholder="Enter result..."
                                                        className="w-full max-w-36 rounded-xl border border-[#A9A9A9] px-3 py-2 outline-none"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <div className="mb-6 flex justify-center">
                            <button
                                type="button"
                                onClick={() => handleSubmit()}
                                disabled={isSaving}
                                className="w-full max-w-xs rounded-full bg-[#31486F] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#243855] disabled:opacity-50 sm:w-auto"
                            >
                                {isSaving ? "Saving..." : "Save Result"}
                            </button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
