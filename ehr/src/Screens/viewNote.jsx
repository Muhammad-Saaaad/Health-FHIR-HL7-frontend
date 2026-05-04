import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import { specific_visit_note, specific_lab_reports_for_visit_note } from "../api/visit_note";
import error_response from "../api/error_response";
import { submit_claim } from "../api/claims";
import Sidebar from "../components/sidebar";
import Heading from "../components/heading"
import Label from "../components/label";
import Textbox from "../components/textbox";
import Button from "../components/button";
import { LabReports } from "../components/records";

export default function ViewNote() {
    
    const location = useLocation();
    const state = location.state;

    const { data: note_detail, isLoading, isError, error, status, refetch: refetch_specific_note} = useQuery({
        queryKey: ["specific_visit_note", state?.note_id],
        queryFn: () => specific_visit_note(state?.note_id),
        enabled: Boolean(state?.note_id),
        retry: false,
    })

    const { data: lab_report_detail, isLoading: isLabReportsLoading, isError: isLabReportsError } = useQuery({
        queryKey: ["specific_lab_reports_for_visit_note", state?.note_id],
        queryFn: () => specific_lab_reports_for_visit_note(state?.note_id),
        enabled: Boolean(state?.note_id),
        retry: false,
    })

    let lab_test_names = []
    lab_report_detail?.map((report) => {
        if (report?.test_name){
            lab_test_names.push(report.test_name);
        }
    })

    const { mutate: submitClaimMutation, isPending } = useMutation({
        mutationFn: submit_claim,
        onSuccess: () => {
            refetch_specific_note(state?.note_id);
            console.log("Claim submitted successfully:");
        },
        onError: (error) => {
            error_response(error, "Failed to submit claim");
        }
    });

    function submitClaim(){
        const payload = {
            "vid": state?.note_id,
            "mpi": note_detail?.mpi,
            "service_included": true,
            "lab_included": lab_test_names.length > 0,
            "total_fee": note_detail?.total_bill,
        }
        console.log("Submitting claim with payload:", payload);
        submitClaimMutation(payload);
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto px-3">
                <Heading className="text-center" text={note_detail?.note_title} />

                <div className="my-5 p-1 border-2 rounded-2xl border-[#7A7979]">
                    <div>
                        <Label className="text-[#32496F]" text="Patient Complaint: " />
                        <Label className="text-[#7A7979] font-normal" text={!isLoading && !isError && note_detail?.patient_complaint} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Diagnosis: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && note_detail?.dignosis)} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Consultation Notes: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && note_detail?.note_details)} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Lab Tests: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && lab_test_names.join(", "))} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Bill: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && note_detail?.consultation_bill)} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Bill Status: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && note_detail?.bill_status)} />
                    </div>
                </div>

                <div className="border-2 rounded-2xl border-[#7A7979] h-80 p-1">
                    
                    {(!isLabReportsLoading && !isLabReportsError) && <LabReports data={lab_report_detail} />}
                </div>

                <br />
                <div>
                    <Label text="Total Lab Charges" />
                    <Textbox type="number" readOnly={true} value={!isLoading && !isError && note_detail?.lab_bill} />
                    <br />
                    <Label text="Total Bill Amount" />
                    <Textbox type="number" readOnly={true} value={!isLoading && !isError && note_detail?.total_bill} />
                </div>

                <br />

                <div className="flex justify-center">
                    <Button text={isPending ? "Submitting..." : "Submit Claim"} className="w-50" onClick={submitClaim} disabled={isPending} />
                </div>

                <br />
                <br />

            </main>
        </div>
    )
}