import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import error_response from "../api/error_response";
import { add_hospital } from "../api/doctor";

import Heading from "../components/heading";
import Label from "../components/label";
import Textbox from "../components/textbox";
import Button from "../components/button";

export default function AdminPanel() {
    
    const navigate = useNavigate();
    const [addHospital, setAddHospital] = useState(false);
    const [hospitalName, setHospitalName] = useState("");

    const { mutate: addHospitalMutate } = useMutation({
        mutationFn: add_hospital,
        onSuccess: (response) => {
            alert("Hospital added successfully!");
            setAddHospital(false);
        },
        onError: (error) => {
            error_response(error, "Failed to add hospital");
        }
    });


    function handleAddHospital() {
        if (!hospitalName.trim()) {
            alert("Hospital name cannot be empty.");
            return;
        }
        addHospitalMutate({
            name: hospitalName.trim()
        });
    }

    return (
        <div className="p-5">
            <Heading text="Admin Panel" />
            <br />

            <div className="border-2 border-gray-400 rounded-xl flex p-5 justify-around">
                <Button className="h-15 w-30 text-md" text="Show Hospitals" onClick={() => navigate("/hospitals")} />

                <Button className="h-15 w-30 text-md" text="Add Hospital" onClick={() => setAddHospital(true)} />
            </div>
            
            <br />

            {
                addHospital && (
                    <div className="flex flex-col border-2 border-gray-400 rounded-xl p-3 justify-around items-center">
                        <div className="w-full">
                            <Textbox placeholder="Enter hospital name" onChange={(e) => setHospitalName(e.target.value)} />
                        </div>
                        <br />
                        <div className="flex items-center gap-10">
                            <Button className="h-10 w-25 text-md" text="Save" onClick={handleAddHospital} />
                            <Button className="h-10 w-25 text-md" text="Cancel" onClick={() => setAddHospital(false)} />
                        </div>
                    </div>
                )
            }


            
        </div>
    )
}