import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

import { add_server } from "../api/server";
import error_response from "../api/error_response";

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
            alert("Server Added Sucessfully");
            navigator("/dashboard");
        },
        onError: (error) => {error_response(error, "Failed to add Server")}
    })

    const [name, setName] = useState("");
    const [ip, setIp] = useState("");
    const [port, setPort] = useState("");
    const [protocol, setProtocol] = useState("");
    const [category, setCategory] = useState("");
    const [systemId, setSystemId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!protocol || (protocol !== "FHIR" && protocol !== 'HL7')){
            alert("Select a protocol");
            return;
        }

        if (!category){
            alert("Select a category");
            return;
        }

        if (!systemId){
            alert("Enter a system ID");
            return;
        }

        mutation.mutate({
            name: name,
            ip: ip,
            port: parseInt(port),
            protocol: protocol,
            category: category,
            system_id: systemId
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

                    <Label text="System Id" />
                    <br />
                    <Textbox
                        placeholder="Enter System Id"
                        onChange={(e) => setSystemId(e.target.value)}
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

                    <Label text="Category" />
                    <br />
                    <SearchDropDown
                        options={["EHR", "LIS", "Payer", "PHR"]}
                        defaultValue={category || "Select Category"}
                        onSelect={(value) => setCategory(value)}
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