import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { reg_patients } from "../api/client";

import Sidebar from "../components/sidebar";
import { LowerHeading } from "../components/heading"
import Label from '../components/label'
import Textbox, { DateTextBox } from "../components/textbox"
import RadioButton from '../components/radioButton'
import Button from "../components/button"

export default function AddCustomer() {

    const [form, setForm] = useState({
        name: "",
        dob: null,
        phone: "",
        gender: "",
        plan_type: "",
    });

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: reg_patients,
        onSuccess: (res) => {
            alert(`Customer registered successfully!`);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({
            name: form.name,
            dob: form.dob,
            phone_no: form.phone || undefined,
            gender: form.gender || undefined,
            plan_type: form.plan_type || undefined,
        });
    };

    return (
        <div className="flex overflow-hidden">
            <Sidebar />
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6">
                <LowerHeading text="Submit New Insurance Claim"></LowerHeading>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-y-5 sm:gap-y-7 lg:gap-y-10 mt-5 sm:mt-7 lg:mt-10">
                    <div className="flex items-center lg:justify-center">
                        <Label>Customer</Label>
                    </div>
                    <div className="col-span-2 flex justify-center items-center">
                        <Textbox
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </div>

                    <div className="flex items-center md:justify-center lg:justify-center">
                        <Label>Date of Birth</Label>
                    </div>
                    <div className="col-span-2 flex justify-center items-center md:justify-end lg:justify-start">
                        <DateTextBox
                            placeholder="Enter your DOB"
                            selected={form.dob}
                            onChange={(date) => handleChange("dob", date)}
                        />
                    </div>

                    <div className="flex items-center lg:justify-center">
                        <Label>Phone-No</Label>
                    </div>
                    <div className="col-span-2 flex justify-center items-center">
                        <Textbox
                            placeholder="Enter your Phone-no"
                            value={form.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                        />
                    </div>

                    <div className="flex items-start md:justify-center md:mt-3 lg:justify-center">
                        <Label>Gender</Label>
                    </div>
                    <div className="col-span-2 flex justify-center lg:justify-start items-center space-x-8">
                        <RadioButton
                            items={["Male", "Female"]}
                            name="gender"
                            onChange={(val) => handleChange("gender", val)}
                        />
                    </div>

                    <div className="flex items-start col-span-2 lg:justify-center lg:col-span-2 md:col-span-1">
                        <Label>Insurance Plan Type</Label>
                    </div>
                    <div className="col-span-3 flex justify-center lg:justify-start items-center space-x-8">
                        <RadioButton
                            items={["Bronze", "Silver", "Golden"]}
                            name="Plan Type"
                            onChange={(val) => handleChange("plan_type", val)}
                        />
                    </div>
                </div>

                <br /><br />

                {isError && (
                    <p className="text-center text-red-500 mb-4">
                        {error?.response?.data?.detail || error?.message || "Submission failed"}
                    </p>
                )}

                <div className="flex justify-center space-x-10 md:space-x-20 lg:space-x-40">
                    <Button className="w-40 bg-gray-200 text-[#202020]" text="Cancel" type="button" />
                    <Button className="w-40" text={isPending ? "Submitting..." : "Submit Claim"} disabled={isPending} />
                </div>
            </form>
        </div>
        
    )
}