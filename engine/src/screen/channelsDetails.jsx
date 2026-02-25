import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { get_mappings } from "../api/client";

import Heading from "../components/heading";
import Label from "../components/label";
import Textbox from "../components/textbox";
import SideBar from "../components/sidebar";
import Button from "../components/button";

export default function ChannelDetails() {

    const location = useLocation();
    const route = location.state; // full route object from API

    const { data: mappingData, isLoading: mappingLoading, isError: mappingError } = useQuery({
        queryKey: ["get_mappings", route?.route_id],
        queryFn: () => get_mappings(route?.route_id),
        enabled: !!route?.route_id,
    });

    // Format each rule as:  "src_name → dest1_name + dest2_name"
    const mappingLines = mappingData?.data?.map(rule => {
        const src = rule.src_field?.name ?? "?";
        const dest = Array.isArray(rule.dest_field)
            ? rule.dest_field.map(d => d.name).join(" + ")
            : (rule.dest_field?.name ?? "?");
        return `${src} → ${dest}`;
    }) ?? [];

    const mappingText = mappingLoading
        ? "Loading mappings..."
        : mappingError
            ? "Failed to load mappings"
            : mappingLines.join("\n");

    return (
        <div className="flex overflow-hidden h-screen">
            <SideBar />
            <main className="flex-1 overflow-y-auto p-4">
                <Heading text="Channels Details" />
                <br /><br />

                <Label text="Channel Name" />
                <br />
                <Textbox value={route?.channel_name ?? ""} readOnly={true} />
                <br />

                <Label text="Source Server" />
                <br />
                <Textbox value={route?.src_server?.name ?? ""} readOnly={true} />
                <br />

                <Label text="Source Endpoint" />
                <br />
                <Textbox value={route?.src_endpoint?.url ?? ""} readOnly={true} />
                <br />

                <Label text="Destination Server" />
                <br />
                <Textbox value={route?.dest_server?.name ?? ""} readOnly={true} />
                <br />

                <Label text="Destination Endpoint" />
                <br />
                <Textbox value={route?.dest_endpoint?.url ?? ""} readOnly={true} />
                <br />

                <Label text="Msg Type" />
                <br />
                <Textbox value={route?.msg_type ?? ""} readOnly={true} />
                <br />

                <Label text="Format" />
                <br />
                <Textbox value={route?.format ?? "FHIR To HL7"} readOnly={true} />
                <br />

                <div className="flex justify-center items-center">
                    <Label text="Mapping" className="text-[#31486F]" />
                </div>

                <textarea
                    className="border border-gray-500 rounded-2xl w-full h-40 p-3 text-sm text-gray-700 resize-none"
                    readOnly
                    value={mappingText}
                />

                <br /><br />

                <div className="flex justify-center space-x-10 md:space-x-20 lg:space-x-40">
                    <Button className="w-40" text="Edit" />
                    <Button className="w-40 bg-gray-200 text-[#202020]" text="Delete" />
                </div>

            </main>
        </div>
    )
}
