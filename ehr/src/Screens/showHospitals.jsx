import { get_all_hospitals } from "../api/doctor";
import Heading from "../components/heading";
import { useQuery } from "@tanstack/react-query";

export default function ShowHospitals() {
    const { data: hospitals, isLoading, error } = useQuery({
        queryKey: ["all_hospitals"],
        queryFn: get_all_hospitals,
    });

    return <div className="p-5">
        <Heading text="All Hospitals" />
        <br />
        <hr className="text-gray-400" />
        <br />
        
        <div className="h-full space-y-3 overflow-y-auto pr-1 md:pr-2 [scrollbar-gutter:stable]">
            {hospitals?.map((hospital, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between rounded-2xl border border-[#7A7979] bg-white px-4 py-4 shadow-sm transition-colors hover:bg-slate-100"
                >
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="text-md font-semibold text-[#152F5B]">
                                {hospital?.name || "Unnamed Hospital"}
                            </p>
                            <p className="mt-1 text-md text-[#7A7979]">
                                ID: {hospital?.hospital_id || ""}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    </div>
}