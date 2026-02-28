import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import { add_endpoint } from "../api/endpoint";
import { get_servers } from "../api/server";

import Heading from "../components/heading"
import Label from "../components/label"
import Textbox from "../components/textbox"
import Button from "../components/button"
import DropDown from "../components/dropdown"
import SideBar from "../components/sidebar"

export default function AddEndPoint() {

    const [form, setForm] = useState({
        server_id: null,
        url: "",
        server_protocol: "",
        sample_msg: "",
    });

    const { data, isError: serverError, error: serverErrMsg } = useQuery({
        queryKey: ["endpoint_all_servers"],
        queryFn: get_servers
    });

    const keys = data?.data?.map(item => item.server_id) ?? [];
    const names = data?.data?.map(item => item.name) ?? [];

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: add_endpoint,
        onSuccess: () => {
            alert("Endpoint added successfully!");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({
            server_id: form.server_id,
            url: form.url,
            server_protocol: form.server_protocol,
            sample_msg: form.server_protocol === "FHIR"
                ? (() => { try { return JSON.parse(form.sample_msg); } catch { return form.sample_msg; } })()
                : form.sample_msg,
        });
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar />
            <main className="flex-1 overflow-y-auto p-4">
                <Heading text="Add EndPoint" />
                <br />

                <form onSubmit={handleSubmit}>

                    <Label text="Server"></Label>
                    <br />
                    <DropDown
                        keys={keys}
                        values={names}
                        defaultValue="Select Server"
                        onSelect={(value) => setForm(prev => ({ ...prev, server_id: value }))}
                    />

                    {serverError && <p className="text-red-500 font-semibold mt-1">{serverErrMsg?.message}</p>}
                    <br />

                    {/* <Label text="Protocol"></Label>
                    <br />
                    <DropDown
                        keys={["FHIR", "HL7"]}
                        values={["FHIR", "HL7"]}
                        defaultValue="Select Protocol"
                        onSelect={(value) => setForm(prev => ({ ...prev, server_protocol: value }))}
                    />
                    <br /> */}

                    <Label text="URL"></Label>
                    <br />
                    <Textbox
                        placeholder="Enter Endpoint URL"
                        value={form.url}
                        onChange={(e) => setForm(prev => ({ ...prev, url: e.target.value }))}
                    />

                    <Label text="Sample Message"></Label>
                    <br />
                    <textarea
                        placeholder={form.server_protocol === "HL7" ? "Enter raw HL7 message (segments separated by \\n)" : "Enter FHIR JSON"}
                        className="border-2 border-[#E8F3F1] rounded-xl w-full p-2 h-100"
                        value={form.sample_msg}
                        onChange={(e) => setForm(prev => ({ ...prev, sample_msg: e.target.value }))}
                    />
                    <br />

                    {isError && (
                        <p className="text-red-500 font-semibold mb-3">
                            {error?.response?.data?.detail || error?.message || "Failed to add endpoint"}
                        </p>
                    )}

                    <div className="flex justify-center">
                        <Button text={isPending ? "Adding..." : "Add EndPoint"} type="submit" className={"w-40"} disabled={isPending} />
                    </div>

                </form>

            </main>
        </div>
    );
}
