import { get_all_labs } from "../api/user";
import Heading from "../components/heading";
import { useQuery } from "@tanstack/react-query";

export default function ShowLabs() {
    const { data: labs, isLoading, error } = useQuery({
        queryKey: ["all_labs"],
        queryFn: get_all_labs,
    });

    return <div className="p-5">
        <Heading text="All Labs" />
        <br />
        <hr className="text-gray-400" />
        <br />
        
        <div className="h-full space-y-3 overflow-y-auto pr-1 md:pr-2 [scrollbar-gutter:stable]">
            {labs?.map((lab, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between rounded-2xl border border-[#7A7979] bg-white px-4 py-4 shadow-sm transition-colors hover:bg-slate-100"
                >
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="text-md font-semibold text-[#152F5B]">
                                {lab?.name || "Unnamed Lab"}
                            </p>
                            <p className="mt-1 text-md text-[#7A7979]">
                                ID: {lab?.lab_id || ""}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    </div>
}