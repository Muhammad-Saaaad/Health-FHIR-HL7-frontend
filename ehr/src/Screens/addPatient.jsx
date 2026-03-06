import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { reg_patient } from "../api/patient"

import Heading from "../components/heading"
import Label from "../components/label"
import Textbox, { DateTextBox } from "../components/textbox"
import Button from "../components/button"
import DropDown from "../components/dropdown"
import Sidebar from "../components/sidebar"

function AddPatient() {

    const [patient, setPatient] = useState({
        nic: "",
        name: "",
        phone_no: "",
        gender: "",
        date_of_birth: "",
        address: "",
        insurance_company: "",
        policy_number: "",
        plan_type: ""
    });

    const handleChange = (field, value) => {
        console.log(`Updating field ${field} to value ${value}`);
        setPatient(prev => ({ ...prev, [field]: value }));
    };

    const { mutate, isPending } = useMutation({
        mutationFn: reg_patient,
        onSuccess: () => {
            alert("Patient registered successfully!");
        },
        onError: (err) => {
            const detail = err?.response?.data?.detail;
            const status = err?.response?.status;
    
            let message;
            // Sometimes FastAPI returns details as an array, and sometimes it returns it as a string,
            // so we need to handle both cases. 
            if (Array.isArray(detail)) {
                // if an array we loop through each error, where the location of the error is in loc[1],
                //  and the error message is in msg, and we join them with a new line.
                message = detail.map(e => `${e.loc[1]}: ${e.msg}`).join("\n");
            } else {
                message = detail || err?.message || "Unknown error";
            }
            
            alert(`Failed to register patient: ${message} (Status: ${status})`);
        }
    });

    const SubmitEvent = (e) => {
        e.preventDefault();
        console.log(patient);

        const requiredFields = ["name", "nic", "gender", "date_of_birth", "policy_number", "insurance_company", "plan_type"];
        for (const field of requiredFields) {
            if (patient[field] === "") {
                alert(`${field} is a required field.`);
                return;
            }
        }

        const payload = {...patient, 
            "phone_no": patient["phone_no"].trim() === "" ? null : patient["phone_no"],
            "address": patient.address.trim() === "" ? null : patient.address
        };
        mutate(payload);
    }

    return <div className="flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-3">
            <form onSubmit={SubmitEvent}>
                <Heading text="Add Patient" />
                <br /><br />

                <Label>Name</Label>
                <br />
                <Textbox
                    placeholder="Enter your Name"
                    value={patient.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    // className="border-red-500"
                />
                <br /><br />

                <Label>Date of Birth</Label>
                <br />
                <DateTextBox 
                    placeholder="Enter date of birth" 
                    onChange={(date) => {
                        // only get the date, then formate it to yyyy-mm-dd
                        const formattedDate = date.toLocaleDateString().split('/').reverse().join('-');
                        handleChange("date_of_birth", formattedDate);
                    }}
                />
                {/* <DateTextBox placeholder="Enter date of birth" /> */}
                <br />

                <Label>Gender</Label>
                <br />
                <DropDown
                    defaultValue="Select Gender"
                    options={["Male", "Female"]}
                    onSelect={(val) => handleChange("gender", val)}
                />
                <br /><br />

                <Label>NIC</Label>
                <br />
                <Textbox
                    placeholder="Enter your NIC"
                    value={patient.nic}
                    onChange={(e) => handleChange("nic", e.target.value)}
                />
                <br /><br />

                <Label>Phone no</Label>
                <br />
                <Textbox
                    placeholder="Enter your Phone no"
                    value={patient["phone_no"]}
                    onChange={(e) => handleChange("phone_no", e.target.value)}
                />
                <br /><br />

                <Label>Address</Label>
                <br />
                <Textbox
                    placeholder="Enter your Address"
                    value={patient.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                />
                <br /><br />

                <Label>Insurance Company</Label>
                <br />
                <DropDown
                    defaultValue="Select Insurance Company"
                    options={["Star Insurance", "Jubliee"]}
                    onSelect={(val) => handleChange("insurance_company", val)}
                />
                <br /><br />

                <Label>Policy Number</Label>
                <br />
                <Textbox
                    placeholder="Policy Number"
                    value={patient.policy_number}
                    onChange={(e) => handleChange("policy_number", e.target.value)}
                />
                <br /><br />

                <Label>Plane Type</Label>
                <br />
                <DropDown
                    defaultValue="Select Policy Plan"
                    options={["Golden", "Silver", "Bronze"]}
                    onSelect={(val) => handleChange("plan_type", val)}
                />
                <br /><br /><br />

                <Button text={isPending ? "Saving..." : "Save"} disabled={isPending} />
            </form>
        </main>
    </div>
}

export default AddPatient;