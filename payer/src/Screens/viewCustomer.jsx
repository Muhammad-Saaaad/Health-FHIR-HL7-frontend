import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { get_patient_by_id } from "../api/patient";
import Sidebar from "../components/sidebar";
import Heading from "../components/heading";
import Label from "../components/label";
import { ExpenseBreakdown } from "../components/records";

export default function ViewCustomer() {

    const location = useLocation();
    const state = location.state;
    const patientId = state?.pid;

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["payer_getSinglePatient", patientId],
        queryFn: () => get_patient_by_id(patientId),
        enabled: Boolean(patientId)
    });
    
    const remaining_amount = data?.patient_policy?.total_coverage - data?.patient_policy?.amount_used;
    const policy_status = data?.patient_policy?.status;
    const patient_nic = (data?.nic === "" || data?.nic === undefined || data?.nic === null) ? "Null" : data?.nic;

    return <div className="flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-2 sm:p-5 md:p-8">
                <Heading text={data?.name} />
                <br />

                <Label className="text-[#32496F]" text="Policy Details "/>
                <div className="my-5 p-1 border-2 rounded-2xl border-[#7A7979] flex flex-col gap-2">
                    <div>
                        <Label className="text-[#32496F]" text="Total Coverage: "/>
                        <Label className="text-[#7A7979] font-normal" text={!isLoading && !isError && data?.patient_policy?.total_coverage} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Amount used: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && data?.patient_policy?.amount_used)} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Remaining: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && remaining_amount)} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Policy Number: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && data?.patient_policy?.policy_id )} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Policy Plan: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && data?.patient_policy?.policy_plan)} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Status: " />
                        <Label className={`text-[#7A7979] font-bold ${policy_status === "Active" ? "text-green-500" : "text-red-500"}` } text={(!isLoading && !isError && data?.patient_policy?.status)} />
                    </div>
                </div>
                <br />

                <Label className="text-[#32496F]" text="Customer Info "/>
                <div className="my-5 p-1 border-2 rounded-2xl border-[#7A7979] flex flex-col gap-2">
                    <div>
                        <Label className="text-[#32496F]" text="NIC: "/>
                        <Label className="text-[#7A7979] font-normal" text={!isLoading && !isError && patient_nic} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Age: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && data?.Age)} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Phone-No: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && data?.phone_no)} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Gender: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && data?.gender )} />
                    </div>
                </div>
                <br />

                <Label className="text-[#32496F]" text="Expense Breakdown "/>
                <div className="my-5 p-1 border-2 rounded-2xl border-[#7A7979] flex flex-col gap-2">
                    <div>
                        <ExpenseBreakdown patientId={patientId} policy_id={data?.patient_policy?.policy_id} />
                    </div>
                    
                </div>

            </main>
    </div>

}