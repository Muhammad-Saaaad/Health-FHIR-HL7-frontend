import { useState } from "react"

import Heading from "../components/heading"
import Label from "../components/label"
import Textbox from "../components/textbox"
import DropDown, { SearchDropDown } from "../components/dropdown"
import Button from "../components/button"
import SideBar from "../components/sidebar"

// Hardcoded source and destination fields
const SRC_FIELDS = ["MPI", "Name", "Gender", "DOB", "Address", "Phone no"];
const DEST_FIELDS = ["MPI", "FName", "LName", "Age", "Gender"];

export default function AddChannels() {

    const [data, setData] = useState({
        "Channel_name": "",
        "Src_server_id": 0,
        "Src_endpoint_id": 0,
        "dest_server_id": 0,
        "dest_endpoint_id": 0,
        "msg_type": ""
    });

    const [srcChecked, setSrcChecked] = useState([]);   // list of checked src field names
    const [destChecked, setDestChecked] = useState([]);   // list of checked dest field names
    const [mappings, setMappings] = useState([]);   // added mapping strings

    const toggleSrc = (field) =>
        setSrcChecked(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);

    const toggleDest = (field) =>
        setDestChecked(prev => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);

    const addMapping = () => {
        if (srcChecked.length === 0 || destChecked.length === 0) return;
        const src = srcChecked.join(" + ");
        const dest = destChecked.join(" + ");
        const line = `${src} → ${dest}`;
        if (!mappings.includes(line)) {
            setMappings(prev => [...prev, line]);
        }
        setSrcChecked([]);
        setDestChecked([]);
    };

    const removeMapping = (line) =>
        setMappings(prev => prev.filter(m => m !== line));

    return (
        <div className="flex overflow-hidden h-screen">
            <SideBar />
            <main className="flex-1 overflow-y-auto p-4">
                <Heading text="Add Channels" />
                <br /><br />

                <Label text="Channel Name" />
                <br />
                <Textbox placeholder="Enter Channel Name" onChange={(e) => setData({ ...data, "Channel_name": e.target.value })} />
                <br />

                <Label text="Source Server" />
                <br />
                <DropDown keys={["1"]} values={["ehr"]} defaultValue="Select Source Server" onSelect={(src_server_id) => setData({ ...data, "Src_server_id": src_server_id })} />
                <br /><br />

                <Label text="Source EndPoint" />
                <br />
                <DropDown keys={["1"]} values={["/ehr/register-patient"]} defaultValue="Select Source Endpoint" onSelect={(Src_endpoint_id) => setData({ ...data, "Src_endpoint_id": Src_endpoint_id })} />
                <br /><br />

                <Label text="Destination Server" />
                <br />
                <DropDown keys={["1"]} values={["lis"]} defaultValue="Select Destination Server" onSelect={(dest_server_id) => setData({ ...data, "dest_server_id": dest_server_id })} />
                <br /><br />

                <Label text="Destination EndPoint" />
                <br />
                <DropDown keys={["1"]} values={["/lis/register-patient"]} defaultValue="Select Destination Endpoint" onSelect={(dest_endpoint_id) => setData({ ...data, "dest_endpoint_id": dest_endpoint_id })} />
                <br /><br />

                <SearchDropDown
                    options={["ADT", "ORM", "ORU", "DFT"]}
                    defaultValue="Message Type"
                    onSelect={(msg_type => setData({ ...data, "msg_type": msg_type }))}
                />
                <br /><br />

                {/* ── Mapping ── */}
                <div className="border-2 border-[#31486F] rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-white text-center font-bold text-[#31486F] py-2 border-b-2 border-[#31486F]">
                        Mapping
                    </div>

                    {/* Two-column table */}
                    <div className="grid grid-cols-2 divide-x-2 divide-[#31486F]">
                        {/* Source column */}
                        <div className="p-3">
                            <p className="font-bold text-sm mb-2">Patient</p>
                            {SRC_FIELDS.map(field => (
                                <label key={field} className="flex items-center gap-2 mb-1 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 accent-[#31486F]"
                                        checked={srcChecked.includes(field)}
                                        onChange={() => toggleSrc(field)}
                                    />
                                    <span className={`text-sm ${srcChecked.includes(field) ? "line-through text-gray-400" : "text-gray-700"}`}>
                                        {field}
                                    </span>
                                </label>
                            ))}
                        </div>

                        {/* Destination column */}
                        <div className="p-3">
                            <p className="font-bold text-sm mb-2">PID</p>
                            {DEST_FIELDS.map(field => (
                                <label key={field} className="flex items-center gap-2 mb-1 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 accent-[#31486F]"
                                        checked={destChecked.includes(field)}
                                        onChange={() => toggleDest(field)}
                                    />
                                    <span className={`text-sm ${destChecked.includes(field) ? "line-through text-gray-400" : "text-gray-700"}`}>
                                        {field}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Add Mapping button */}
                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        onClick={addMapping}
                        className="bg-[#31486F] hover:bg-[#1e3352] active:bg-[#152740] text-white font-semibold px-8 py-2 rounded-full transition-colors"
                    >
                        Add Mapping
                    </button>
                </div>

                {/* Added mappings list */}
                {mappings.length > 0 && (
                    <div className="mt-4 flex flex-col gap-2">
                        {mappings.map((line, i) => (
                            <div key={i} className="flex items-center justify-between border-2 border-[#E8F3F1] rounded-2xl px-4 py-2">
                                <span className="text-sm text-gray-600">{line}</span>
                                <button
                                    type="button"
                                    onClick={() => removeMapping(line)}
                                    className="bg-[#31486F] hover:bg-[#1e3352] text-white text-sm font-semibold px-4 py-1 rounded-full transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <br /><br />

                <div className="flex justify-center items-center">
                    <Button text="Add Channel" />
                </div>

            </main>
        </div>
    )
}
