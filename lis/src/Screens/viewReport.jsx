import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { get_test_result } from "../api/result";
import Sidebar from "../components/sidebar";
import Label from "../components/label";
import Heading from "../components/heading";

export default function ViewReport() {
    const { reportId } = useParams();
    const { state } = useLocation();
    const selectedReportId = reportId ?? state?.report_id;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["lis_view_report", selectedReportId],
        queryFn: () => get_test_result(selectedReportId),
        enabled: Boolean(selectedReportId),
        retry: false,
    });

    if (!selectedReportId) {
        return (
            <div className="flex h-screen overflow-hidden bg-[#F7F9FC]">
                <Sidebar />
                <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
                    <Heading text="Report Id not given" />
                </main>
            </div>
        );
    }

    const result = data?.data;

    return (
        <div className="flex h-screen overflow-hidden bg-[#F7F9FC]">
            <Sidebar />
            <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
                <Heading text="Lab Report" />
                <br />

                <Label text="Report Summary" />
                <textarea
                    name="Summary"
                    className="w-full h-32 rounded-2xl border-2 border-[#E8F3F1] p-2"
                    value={isLoading ? "Loading..." : result?.description || "No summary provided"}
                    disabled
                />

                <br />
                <hr />
                <br />

                <Label text="Results" />
                <table className="w-full overflow-hidden rounded-2xl border border-[#E8F3F1] border-collapse">
                    <thead>
                        <tr className="bg-[#F8FAFC] font-bold">
                            <th className="border-b border-[#E8F3F1] p-2 text-left">Parameters</th>
                            <th className="border-b border-[#E8F3F1] p-2 text-left">Normal Range</th>
                            <th className="border-b border-[#E8F3F1] p-2 text-left">Units</th>
                            <th className="border-b border-[#E8F3F1] p-2 text-left">Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td className="p-2 text-[#7A7979]" colSpan={4}>
                                    Loading results...
                                </td>
                            </tr>
                        )}

                        {isError && (
                            <tr>
                                <td className="p-2 text-red-600" colSpan={4}>
                                    Unable to load report results{error?.message ? `: ${error.message}` : ""}
                                </td>
                            </tr>
                        )}

                        {!isLoading && !isError && (result?.mini_test_results?.length ?? 0) === 0 && (
                            <tr>
                                <td className="p-2 text-[#7A7979]" colSpan={4}>
                                    No test results available.
                                </td>
                            </tr>
                        )}

                        {!isLoading && !isError && result?.mini_test_results?.map((test, index) => (
                            <tr key={test?.mini_test_id ?? index} className="border-b border-[#E8F3F1]">
                                <td className="p-2">{test?.test_name ?? "-"}</td>
                                <td className="p-2">{test?.normal_range ?? "-"}</td>
                                <td className="p-2">{test?.units ?? "-"}</td>
                                <td className="p-2 font-semibold text-[#152F5B]">{test?.result_value ?? "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}