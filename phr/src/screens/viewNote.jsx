import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { specific_visit_note, specific_lab_reports_for_visit_note } from "../api/visit_note";
import Sidebar from "../components/sidebar";
import Heading from "../components/heading"
import Label from "../components/label";
import Textbox from "../components/textbox";
import Button from "../components/button";
import { LabReports } from "../components/records";

export default function ViewNote() {
    
    const location = useLocation();
    const state = location.state;

    const { data: note_detail, isLoading, isError, error, status} = useQuery({
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
    let lab_names = []
    lab_report_detail?.map((report) => {
        if (report?.lab_name){
            lab_names.push(report.lab_name);
        }
    });

    function submitClaim(){
        console.log("Claim submitted for note id: ", state?.note_id);
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
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && note_detail?.diagnosis)} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Consultation Notes: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && note_detail?.note_details)} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Lab Name: " />
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && lab_names.join(", "))} />
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
                        <Label className="text-[#7A7979] font-normal" text={(!isLoading && !isError && note_detail?.payment_status)} />
                    </div>
                </div>

                <div className="border-2 rounded-2xl border-[#7A7979] h-80 p-1">
                    
                    {(!isLabReportsLoading && !isLabReportsError) && <LabReports data={lab_report_detail} />}
                </div>

                <br />
                <br />

            </main>
        </div>
    )
}