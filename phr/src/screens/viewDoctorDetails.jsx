import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Sidebar from "../components/sidebar"

import { get_doctor_detail } from "../api/doctor";
import Heading from "../components/heading"
import Label from "../components/label";
import Textbox from "../components/textbox";
import Button from "../components/button";
import { Notes } from "../components/records";

export default function ViewDoctorDetails() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location; // this contains doctor info.

    const { data: doctor_detail, isLoading, isError, error} = useQuery({
        queryKey: ['phr_doctor_detail', state?.doctor_id],
        queryFn: () => get_doctor_detail(state?.doctor_id),
    });

    const user_patient = JSON.parse(localStorage.getItem("user"));

    const rawDoctorName = `${doctor_detail?.name || ""}`.trim();
    const normalizedDoctorName = rawDoctorName.replace(/^dr\.?\s*/i, "").trim();
    const displayDoctorName = normalizedDoctorName ? `Dr. ${normalizedDoctorName}` : "Dr. Doctor";

    return <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main  className="flex-1 overflow-y-auto px-3">
            <Heading text={displayDoctorName} />

            <div className="my-5 p-1 border-2 rounded-2xl border-[#7A7979]">
                <div>
                    <Label className="text-[#32496F]" text="Phone No : " />
                    <Label className="text-[#7A7979] font-normal" text={!isLoading && !isError && doctor_detail?.phone_no } />
                </div>
                <div>
                    <Label className="text-[#32496F]" text="Specialization : " />
                    <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && doctor_detail?.specialization)} />
                </div>
                <div>
                    <Label className="text-[#32496F]" text="last_visit : " />
                    <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && doctor_detail?.last_visit )} />
                </div>
            </div>

            <hr />
            <br />

            <div className="flex items-center justify-between my-2">
                <Heading text="Visiting Notes" level={2} className="inline-block" />
            </div>

            <div className="border-2 rounded-2xl border-[#7A7979] h-80 p-1">
                <Notes mpi={user_patient.mpi} doctor_id={state?.doctor_id} />
            </div>
        </main>
    </div>
}