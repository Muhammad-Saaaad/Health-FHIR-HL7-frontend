import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import error_response from "../api/error_response";
import { add_lab } from "../api/user";

import Heading from "../components/heading";
import Label from "../components/label";
import { BetterTextbox } from "../components/textbox";
import { BetterButton } from "../components/button";

export default function AdminPanel() {
    
    const navigate = useNavigate();
    const [addLab, setAddLab] = useState(false);
    const [labName, setLabName] = useState("");

    const { mutate: addLabMutate } = useMutation({
        mutationFn: add_lab,
        onSuccess: (response) => {
            alert("Lab added successfully!");
            setAddLab(false);
        },
        onError: (error) => {
            error_response(error, "Failed to add lab");
        }
    });


    function handleAddLab() {
        console.log("Adding lab:", labName);
        if (!labName.trim()) {
            alert("Lab name cannot be empty.");
            return;
        }
        addLabMutate({
            name: labName.trim()
        });
    }

    return (
        <div className="p-5">
            <Heading text="Admin Panel" />
            <br />

            <div className="border-2 border-gray-400 rounded-xl flex p-5 justify-around">
                <BetterButton className="h-15 w-30 text-md" text="Show Labs" onClick={() => navigate("/show-labs")} />

                <BetterButton className="h-15 w-30 text-md" text="Add Lab" onClick={() => setAddLab(true)} />
            </div>
            
            <br />

            {
                addLab && (
                    <div className="flex flex-col border-2 border-gray-400 rounded-xl p-3 justify-around items-center">
                        <div className="w-full">
                            <BetterTextbox placeholder="Enter lab name" onChange={(e) => setLabName(e.target.value)} />
                        </div>
                        <br />
                        <div className="flex items-center gap-10">
                            <BetterButton className="h-10 w-25 text-md" text="Save" onClick={handleAddLab} />
                            <BetterButton className="h-10 w-25 text-md" text="Cancel" onClick={() => setAddLab(false)} />
                        </div>
                    </div>
                )
            }


            
        </div>
    )
}