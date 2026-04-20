import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import Heading from "../components/heading"
import Label from "../components/label";
import Button from "../components/button";
import { Notes } from "../components/records";

export default function AddVisitNote() {

    const location = useLocation();
    const { state } = location; // this contains patient info and also doctor id.
    let today_date = new Date();
    let age = today_date.getFullYear() - new Date(state?.date_of_birth).getFullYear() - (today_date.getMonth() < new Date(state?.date_of_birth).getMonth() || (today_date.getMonth() === new Date(state?.date_of_birth).getMonth() && today_date.getDate() < new Date(state?.date_of_birth).getDate()) ? 1 : 0);

    return (
    <div className="p-2">

        <Heading text={"Patient: " + (state?.name)} />

        <div className="my-5 p-1 border-2 rounded-2xl border-[#7A7979]">
            <div>
                <Label className="text-[#32496F]" text="Age: " />
                <Label className="text-[#7A7979] font-normal" text={age} />
            </div>
            <div>
                <Label className="text-[#32496F]" text="Gender: " />
                <Label className="text-[#7A7979] font-normal" text={state?.gender} />
            </div>
            <div>
                <Label className="text-[#32496F]" text="Phone no: " />
                <Label className="text-[#7A7979] font-normal" text={state?.phone_no} />
            </div>
            <div>
                <Label className="text-[#32496F]" text="NIC: " />
                <Label className="text-[#7A7979] font-normal" text={state?.nic} />
            </div>
            <div>
                <Label className="text-[#32496F]" text="Address: " />
                <Label className="text-[#7A7979] font-normal" text={state?.address} />
            </div>
        </div>

        <div className="flex items-center justify-between my-2">
            <Heading text="Visiting Notes" level={2} className="inline-block" />
            <Button text="Add Note" className="w-40" />
        </div>

        <div className="border-2 rounded-2xl border-[#7A7979] h-70 px-2 py-1">
            
            <Notes />
        </div>
        

        {/* <Textbox placeholder="Select lab test..." onChange={event => handleSearchReport(event.target.value)} />
        
        <br /><br />

        { isLoading ? <p>Loading...</p> : data.map((labTest) => <p key={labTest?.loinc_code}>{labTest?.long_common_name}</p>) } */}
    </div>
    );
}