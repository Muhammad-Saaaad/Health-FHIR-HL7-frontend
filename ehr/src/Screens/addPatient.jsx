import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { reg_patient } from "../api/client"

import Heading from "../components/heading"
import Label from "../components/label"
import Textbox, { DateTextBox } from "../components/textbox"
import Button from "../components/button"
import DropDown from "../components/dropdown"
import Sidebar from "../components/sidebar"

function AddPatient() {

    const [patient, setPatient] = useState({
        name: "",
        DOB: "",
        Gender: "",
        NIC: "",
        "Phone no": "",
        Address: "",
        "Insurance Company": "",
        "Policy Number": "",
        "Plane Type": ""
    });

    const handleChange = (field, value) => {
        setPatient(prev => ({ ...prev, [field]: value }));
    };

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: reg_patient,
        onSuccess: (res) => {
            alert(`Patient registered! ID: ${res.data.p_id}`);
        },
    });

    const SubmitEvent = (e) => {
        e.preventDefault();
        mutate({
            name: patient.name,
            cnic: patient.NIC,
            phone_no: patient["Phone no"] || undefined,
            gender: patient.Gender || undefined,
            date_of_birth: patient.DOB || undefined,
        });
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
                />
                <br /><br />

                <Label>Date of Birth</Label>
                <br />
                <Textbox
                    type="date"
                    value={patient.DOB}
                    onChange={(e) => handleChange("DOB", e.target.value)}
                />
                {/* <DateTextBox placeholder="Enter date of birth" /> */}
                <br /><br />

                <Label>Gender</Label>
                <br />
                <DropDown
                    defaultValue="Select Gender"
                    options={["Male", "Female"]}
                    onSelect={(val) => handleChange("Gender", val)}
                />
                <br /><br />

                <Label>NIC</Label>
                <br />
                <Textbox
                    placeholder="Enter your NIC"
                    value={patient.NIC}
                    onChange={(e) => handleChange("NIC", e.target.value)}
                />
                <br /><br />

                <Label>Phone no</Label>
                <br />
                <Textbox
                    placeholder="Enter your Phone no"
                    value={patient["Phone no"]}
                    onChange={(e) => handleChange("Phone no", e.target.value)}
                />
                <br /><br />

                <Label>Address</Label>
                <br />
                <Textbox
                    placeholder="Enter your Address"
                    value={patient.Address}
                    onChange={(e) => handleChange("Address", e.target.value)}
                />
                <br /><br />

                <Label>Insurance Company</Label>
                <br />
                <DropDown
                    defaultValue="Select Insurance Company"
                    options={["Star Insurance", "Jubliee"]}
                    onSelect={(val) => handleChange("Insurance Company", val)}
                />
                <br /><br />

                <Label>Policy Number</Label>
                <br />
                <Textbox
                    placeholder="Policy Number"
                    value={patient["Policy Number"]}
                    onChange={(e) => handleChange("Policy Number", e.target.value)}
                />
                <br /><br />

                <Label>Plane Type</Label>
                <br />
                <DropDown
                    defaultValue="Select Policy Plan"
                    options={["Golden", "Silver", "Bronze"]}
                    onSelect={(val) => handleChange("Plane Type", val)}
                />
                <br /><br /><br />

                {isError && <p style={{ color: "red", marginBottom: "1rem" }}>{error?.response?.data?.detail || error?.message || "Registration failed"}</p>}

                <Button text={isPending ? "Saving..." : "Save"} disabled={isPending} />
            </form>
        </main>
    </div>
}

export default AddPatient;