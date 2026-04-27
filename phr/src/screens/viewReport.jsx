import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getLabReport } from "../api/visit_note";
import Sidebar from "../components/sidebar";
import Label from "../components/label";
import Heading from "../components/heading";

export default function ViewReport() {

    const location = useLocation();
    const state = location?.state;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["lab_report", state?.report_id],
        queryFn: () => getLabReport(state?.report_id),
        enabled: true,
        retry: false,
    });

    if(!state?.report_id) {
        return <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto px-3">
                <Heading text={"Report Id not given"} />
            </main>
        </div>
    }

    return <div  className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-3">
            <Heading text="Lab Report" />
            <br />

            <Label text="Report Summary"/>
            <textarea 
                name="Summary" 
                className="border-2 border-[#E8F3F1] rounded-2xl p-2 w-full h-32" 
                value={isLoading ? "Loading...": data?.description || "No summary provided"}
                disabled
            />
            
            <br />
            <hr />
            <br />

            <Label text="Results"/>
            {/*  Merges adjacent table cell borders into a single shared border. This results in a cleaner, single-line grid appearance. */}
            <table className="w-full border-collapse border border-[#E8F3F1] rounded-2xl overflow-hidden">
                <thead>
                    <tr className="font-bold bg-[#F8FAFC]">
                        <th className="text-left p-2 border-b border-[#E8F3F1]">Parameters</th>
                        <th className="text-left p-2 border-b border-[#E8F3F1]">Normal Range</th>
                        <th className="text-left p-2 border-b border-[#E8F3F1]">Units</th>
                        <th className="text-left p-2 border-b border-[#E8F3F1]">Results</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr>
                            <td className="p-2 text-[#7A7979]" colSpan={4}>Loading results...</td>
                        </tr>
                    )}

                    {isError && (
                        <tr>
                            <td className="p-2 text-red-600" colSpan={4}>
                                Unable to load report results{error?.message ? `: ${error.message}` : ""}
                            </td>
                        </tr>
                    )}

                    {!isLoading && !isError && (data?.mini_test_results?.length ?? 0) === 0 && (
                        <tr>
                            <td className="p-2 text-[#7A7979]" colSpan={4}>No test results available.</td>
                        </tr>
                    )}

                    {!isLoading && !isError && data?.mini_test_results?.map((test, idx) => (
                        <tr key={test?.result_id ?? idx} className="border-b border-[#E8F3F1]">
                            <td className="p-2">{test?.test_name  ?? "-"}</td>
                            <td className="p-2">{test?.normal_range ?? "-"}</td>
                            <td className="p-2">{test?.unit ?? "-"}</td>
                            <td className="p-2 font-semibold text-[#152F5B]">{test?.result_value ?? "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </main>
    </div>
}