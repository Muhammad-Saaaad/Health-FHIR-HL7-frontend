import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import error_response from "../api/error_response"
import { reg_patient } from "../api/patient"
import Heading from "../components/heading"
import Label from "../components/label"
import Textbox, { DateTextBox } from "../components/textbox"
import Button from "../components/button"
import DropDown, { SearchDropDown } from "../components/dropdown"
import Sidebar from "../components/sidebar"

function AddPatient() {
    const navigator = useNavigate();
    const [patient, setPatient] = useState({
        nic: "",
        name: "",
        phone_no: "",
        gender: "",
        date_of_birth: "",
        address: "",
        insurance_company: "",
        policy_number: "",
        plan_type: "",
        hospital_id: localStorage.getItem("hospital_id")
    });

    const handleChange = (field, value) => {
        // console.log(`Updating field ${field} to value ${value}`);
        setPatient(prev => ({ ...prev, [field]: value }));
    };

    const { mutate, isPending } = useMutation({
        mutationFn: reg_patient,
        onSuccess: () => {
            alert("Patient registered successfully!");
            navigator("/home");
        },
        onError: (err) => {error_response(err, "Failed to Register Patient")}
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

                <Label text={"Name"}/>
                <br />
                <Textbox
                    placeholder="Enter your Name"
                    value={patient.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    // className="border-red-500"
                />
                <br /><br />

                <Label text={"Date of Birth"}/>
                <br />
                <DateTextBox 
                    placeholder="Enter date of birth" 
                    onChange={(date) => {
                        // Format date to yyyy-mm-dd
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        const formattedDate = `${year}-${month}-${day}`;
                        console.log("Selected date:", formattedDate);
                        handleChange("date_of_birth", formattedDate);
                    }}
                />
                {/* <DateTextBox placeholder="Enter date of birth" /> */}
                <br />

                <Label text={"Gender"}/>
                <br />
                <DropDown
                    defaultValue="Select Gender"
                    options={["Male", "Female"]}
                    onSelect={(val) => handleChange("gender", val)}
                />
                <br /><br />

                <Label text={"NIC"}/>
                <br />
                <Textbox
                    placeholder="Enter your NIC"
                    value={patient.nic}
                    onChange={(e) => handleChange("nic", e.target.value)}
                />
                <br /><br />

                <Label text={"Phone no"}/>
                <br />
                <Textbox
                    placeholder="Enter your Phone no"
                    value={patient["phone_no"]}
                    onChange={(e) => handleChange("phone_no", e.target.value)}
                />
                <br /><br />

                <Label text={"Address"}/>
                <br />
                <Textbox
                    placeholder="Enter your Address"
                    value={patient.address}
                    required={false}
                    onChange={(e) => handleChange("address", e.target.value)}
                />
                <br /><br />

                <Label text={"Insurance Company"}/>
                <br />
                <SearchDropDown
                    DefaultValueClassName="w-50"
                    OptionsClassNames="w-50"
                    defaultValue={patient.insurance_company || "Select Insurance"}  
                    options={["Star Insurance", "Jubliee"]}
                    onSelect={(val) => handleChange("insurance_company", val)}
                />
                <br /><br />

                <Label text={"Policy Number"}/>
                <br />
                <Textbox
                    placeholder="Policy Number"
                    value={patient.policy_number}
                    onChange={(e) => handleChange("policy_number", e.target.value)}
                />
                <br /><br />

                <Label text={"Plane Type"}/>
                <br />
                <DropDown
                    defaultValue="Select Policy Plan"
                    options={["Golden", "Silver", "Bronze"]}
                    onSelect={(val) => handleChange("plan_type", val)}
                />
                <br /><br /><br />
                <div className="flex justify-center">
                    <Button 
                        text={isPending ? "Saving..." : "Save"} 
                        type="submit" 
                        disabled={isPending} 
                    />
                </div>
            </form>
        </main>
    </div>
}

export default AddPatient;