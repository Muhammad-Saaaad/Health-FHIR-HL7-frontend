import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

import { add_server } from "../api/client"

import Heading from "../components/heading"
import Label from "../components/label"
import Textbox from "../components/textbox"
import Button from "../components/button"
import { SearchDropDown } from "../components/dropdown"
import SideBar from "../components/sidebar"

export default function AddServer() {

    const navigator = useNavigate();
    const mutation = useMutation({
        mutationFn: add_server, 

        onSuccess: () =>{
            navigator("/");
        },
        // onError: (error) => {
        //     alert(error.response?.data?.detail || "Something went wrong");
        // }
    })

    const [name, setName] = useState("");
    const [ip, setIp] = useState("");
    const [port, setPort] = useState("");
    const [protocol, setProtocol] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!protocol || (protocol !== "FHIR" && protocol !== 'HL7')){
            alert("Select a protocol");
            return;
        }

        mutation.mutate({
            name: name,
            ip: ip,
            port: parseInt(port),
            protocol: protocol
        });
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar />
            <main className="flex-1 overflow-y-auto p-4">
                <form className="p-3" onSubmit={handleSubmit}>
                    <Heading text="Add Server" />
                    <br />

                    <Label text="Server Name" />
                    <br />
                    <Textbox
                        placeholder="Enter Server Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />

                    <Label text="IP" />
                    <br />
                    <Textbox
                        placeholder="Enter Server IP"
                        onChange={(e) => setIp(e.target.value)}
                    />
                    <br />

                    <Label text="Port" />
                    <br />
                    <Textbox
                        placeholder="Enter Server Port"
                        onChange={(e) => setPort(e.target.value)}
                    />
                    <br />

                    <Label text="Protocol" />
                    <br />
                    <SearchDropDown
                        options={["FHIR", "HL7"]}
                        defaultValue={protocol || "Select Protocol"}
                        onSelect={(value) => setProtocol(value)}
                    />
                    <br /><br />

                    {mutation.isError && (
                        <p className="text-red-500 font-semibold mb-3">{mutation.error?.response?.data.detail || "Something went wrong"}</p>
                    )}

                    <div className="flex justify-center space-x-10 md:space-x-20 lg:space-x-40">
                        <Button
                            className="w-40"
                            text={mutation.isPending ? "Saving..." : "Add"}
                            type="submit"
                        />
                        <Button
                            className="w-40 bg-gray-200 text-[#202020]"
                            text="Cancel"
                            type="button"
                            onClickPath="/"
                        />
                    </div>
                </form>
            </main>
        </div>
    )
}