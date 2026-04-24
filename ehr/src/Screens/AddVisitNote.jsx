import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import error_response from "../api/error_response"
import { create_visit_note } from "../api/visit_note"

import LabTestSearchResults from "../components/showTestRecords";
import Heading from "../components/heading"
import Label from "../components/label";
import Button from "../components/button";
import Textbox from "../components/textbox"
import { SearchDropDown } from "../components/dropdown"
import Sidebar from "../components/sidebar"

export default function AddVisitNote() {

    const navigator = useNavigate();
    const location = useLocation();
    const mpi = location.state?.mpi;
    const doctor_id = localStorage.getItem("doctor_id");

    const [note, setNote] = useState({
        mpi: mpi,
        doctor_id: doctor_id,

        note_title: "",
        patient_complaint: "",
        dignosis: "",
        note_details: "",
        bill_amount: 0,
        lab_name: "",
        test_names: []
    });
    const [showAddLab, setShowAddLab] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: create_visit_note,
        onSuccess: () => {
            alert("Visit note created successfully!");
            navigator("/ehr/view-patient", { state: { mpi } });
        },
        onError: (err) => {error_response(err, "Failed to create visit note")}
    });

    const handleChange = (field, value) => {
        setNote(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveNote = () => {
        console.log(note);
    }

    return (
    <div className="flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-3">
            <Heading text="Visiting Notes" />
            <br /><br />

            <Label text={"Note Title"}/>
            <br />
            <Textbox
                placeholder="Enter Note Title"
                value={note.note_title}
                onChange={(e) => handleChange("note_title", e.target.value)}
            />
            <br /><br />

            <Label text={"Patient Complaint"}/>
            <br />
            <Textbox
                placeholder="Enter Patient Complaint"
                value={note.patient_complaint}
                onChange={(e) => handleChange("patient_complaint", e.target.value)}
            />
            <br /><br />

            <Label text={"Diagnosis"}/>
            <br />
            <Textbox
                placeholder="Enter Diagnosis"
                value={note.dignosis}
                onChange={(e) => handleChange("dignosis", e.target.value)}
            />
            <br /><br />

            <Label text={"Consulatation Notes"}/>
            <br />
            <textarea 
                name="consultation_notes" 
                className="border-2 border-[#E8F3F1] rounded-2xl p-2 w-full h-32" 
                placeholder="Enter Consultation Notes" 
                value={note.note_details} 
                onChange={(e) => handleChange("note_details", e.target.value)} 
            />
            <br /><br />

            <hr />

            <div className="flex items-start justify-between mt-5">
        
                <div>
                    <Label text={"Lab Tests"}/>
                    <br />
                    <SearchDropDown
                        DefaultValueClassName="w-50"
                        OptionsClassNames="w-50"
                        defaultValue={"Select Lab"}
                        options={["IDC", "MIR"]}
                        onSelect={(val) => handleChange("lab_name", val)}
                    />
                </div>

                <p 
                    className="font-bold underline text-[#152F5B] select-none cursor-pointer active:text-[#3266c0]"
                    onClick={() => setShowAddLab(true)}
                >
                    + Add Test
                </p>
            </div>
            <br />
            { showAddLab && <LabTestSearchResults data={note.test_names} /> }

            <hr />

            <div className="flex justify-center items-center my-5">
                <Button text="Save" onClick={handleSaveNote} />
            </div>
        </main>
    </div>
    );
}