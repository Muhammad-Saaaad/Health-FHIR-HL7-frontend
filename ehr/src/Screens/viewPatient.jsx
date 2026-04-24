import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { get_patient_detail } from "../api/patient";
import Sidebar from "../components/sidebar";
import Heading from "../components/heading"
import Label from "../components/label";
import Button from "../components/button";
import { Notes } from "../components/records";

export default function AddVisitNote() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location; // this contains patient info and also doctor id.

    const { data, isLoading, isError, error} = useQuery({
        queryKey: ['ehr_patient_detail', state?.mpi],
        queryFn: () => get_patient_detail(state?.mpi)
    });

    const patient_detail = data?.data;

    return (
    <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-3">

            <Heading text={"Patient: " + (!isLoading && !isError && patient_detail?.name)} />

            <div className="my-5 p-1 border-2 rounded-2xl border-[#7A7979]">
                <div>
                    <Label className="text-[#32496F]" text="Age: " />
                    <Label className="text-[#7A7979] font-normal" text={!isLoading && !isError && patient_detail?.age} />
                </div>
                <div>
                    <Label className="text-[#32496F]" text="Gender: " />
                    <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && patient_detail?.gender)} />
                </div>
                <div>
                    <Label className="text-[#32496F]" text="Phone no: " />
                    <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && patient_detail?.phone_no)} />
                </div>
                <div>
                    <Label className="text-[#32496F]" text="NIC: " />
                    <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && patient_detail?.nic)} />
                </div>
                <div>
                    <Label className="text-[#32496F]" text="Address: " />
                    <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && patient_detail?.address)} />
                </div>
            </div>

            <div className="flex items-center justify-between my-2">
                <Heading text="Visiting Notes" level={2} className="inline-block" />
                <Button text="Add Note" className="w-40" onClick={() => navigate('/ehr/add-visit-note', { state: { mpi: state?.mpi } })} />
            </div>

            <div className="border-2 rounded-2xl border-[#7A7979] h-80 p-1">
                <Notes mpi={state?.mpi} />
            </div>

        </main>
    </div>
    );
}