import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { get_patient_waiting_list } from "../api/home";
import Sidebar from "../components/sidebar";
import Heading from "../components/heading";
import Textbox from "../components/textbox";
import { CustomDropDown } from "../components/dropdown";

export default function PendingList() {
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");
    const { data, isLoading, error } = useQuery({
        queryKey: ["lis_patient_waiting_list"],
        queryFn: get_patient_waiting_list,
    });

    const handleOpen = (item) => {
        if (!userId) {
            alert("Please log in again before opening a patient.");
            return;
        }

        // Locking disabled; open the record directly.
        navigate(`/pending-test/${item?.nic}/${item?.vid}`, {
            state: {
                nic: item?.nic,
                vid: item?.vid,
                fname: item?.fname,
                lname: item?.lname,
                test_req_id: item?.test_req_id,
            },
        });
    };

    const pendingPatients = data?.data ?? [];

    return (
        <div className="flex overflow-hidden">
            <Sidebar />

            <main className="flex-1 overflow-y-auto p-2 sm:p-5 md:8">
                <Heading text="Pending List" />

                <div className="mt-5 grid grid-cols-3 gap-3 sm:mt-7 sm:mr-5">
                    <div className="col-start-1 col-end-3 sm:col-end-2">
                        <Textbox placeholder="Search Patient" />
                    </div>

                    <div className="col-start-3 flex items-start justify-end">
                        <CustomDropDown
                            options={["Name", "NIC"]}
                            defaultValue="Search by"
                            onSelect={(value) => console.log(value)}
                        />
                    </div>
                </div>

                <section className="mt-8 space-y-3 pb-6">
                    {isLoading ? (
                        <p className="text-sm text-[#7A7979]">Loading pending patients...</p>
                    ) : error ? (
                        <p className="text-sm text-red-600">Unable to load pending patients.</p>
                    ) : pendingPatients.length ? (
                        pendingPatients.map((item, index) => (
                            <article
                                key={item?.test_req_id ?? item?.vid ?? index}
                                className="flex items-center justify-between rounded-2xl border border-[#A9A9A9] bg-white px-3 py-3 shadow-sm transition-colors hover:bg-slate-50 sm:px-4 cursor-pointer"
                                onClick={() => handleOpen(item)}
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E5E7EB] text-[#7A7979]">
                                        <img
                                            src="/icons/main/Profile_pic.png"
                                            alt="patient"
                                            className="h-12 w-12 object-contain"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-[#152F5B] sm:text-base">
                                            {item?.fname} {item?.lname}
                                        </p>
                                        <p className="text-xs font-semibold text-[#7A7979] sm:text-sm">NIC: {item?.nic}</p>
                                        <p className="text-xs text-[#7A7979] sm:text-sm">Date: {item?.date}</p>
                                        <p className="text-xs font-semibold text-[#7A7979] sm:text-sm">VID: {item?.vid}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center px-2 text-[#7A7979]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </div>
                            </article>
                        ))
                    ) : (
                        <p className="text-sm text-[#7A7979]">No pending patients found.</p>
                    )}
                </section>
            </main>
        </div>
    );
}