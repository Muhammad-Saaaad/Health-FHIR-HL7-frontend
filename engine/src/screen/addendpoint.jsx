import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import { add_endpoint } from "../api/endpoint";
import { get_servers } from "../api/server";
import error_response from "../api/error_response";

import Heading from "../components/heading"
import Label from "../components/label"
import Textbox from "../components/textbox"
import Button from "../components/button"
import DropDown from "../components/dropdown"
import SideBar from "../components/sidebar"

export default function AddEndPoint() {

    const navigator = useNavigate();
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
        onError: (err) =>{error_response(err, "Failed to Add Endpoint")}
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const input = {
            server_id: form.server_id,
            url: form.url,
            server_protocol: form.server_protocol,
            // server_protocol: protocol[0].protocol,
            sample_msg: form.server_protocol === "FHIR"
                // here the () at the end is called IIFE -> (Immediatliy invoke function Expression) meaning
                // execute this function write away, without it, it won't execute. 
                ? (() => { try { return JSON.parse(form.sample_msg); } catch { return form.sample_msg; } })() 
                : form.sample_msg,
        }
        console.log(input);
        mutate(input);
        setForm({
            server_id: null,
            url: "",
            server_protocol: "",
            sample_msg: "",
        });
        useNavigate("/dashboard");
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
                        onSelect={(value) => {
                            const protocol = data?.data?.filter(item => item.server_id === value);
                            if (protocol.length !== 1){
                                alert("Error while getting Server's Protocol");
                                return ;
                            }
                            console.log("protocol: ",protocol[0].protocol);
                            setForm(prev => (
                                { 
                                    ...prev,
                                    server_id: value,
                                    server_protocol: protocol[0].protocol 
                                }
                            ))
                        }}
                    />

                    {serverError && <p className="text-red-500 font-semibold mt-1">{serverErrMsg?.message}</p>}
                    <br />

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
                        placeholder={form.server_protocol === "HL7" ? "Enter raw HL7 message" : "Enter FHIR JSON"}
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
