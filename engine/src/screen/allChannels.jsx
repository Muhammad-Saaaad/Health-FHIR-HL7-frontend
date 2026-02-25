import { useQuery } from "@tanstack/react-query";
import { get_all_channels } from "../api/client";
import { ChannelsTable } from "../components/table";
import Heading from "../components/heading";
import SideBar from "../components/sidebar";
import Button from "../components/button";

export default function AllChannels() {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["get_all_channels"],
        queryFn: get_all_channels,
    });

    // Map API response to the shape ChannelsTable expects
    const tableData = data?.data?.map(route => ({
        channel_name: route.channel_name,
        source: route.src_server?.name,
        destination: route.dest_server?.name,
        raw: route,              // full object for detail screen
    })) ?? [];

    return (
        <div className="flex overflow-hidden h-screen">
            <SideBar />
            <main className="flex-1 overflow-y-auto p-4">
                <Heading text="Channels" />
                <br /><br />

                {isLoading && <p className="text-gray-500">Loading channels...</p>}
                {isError && <p className="text-red-500">{error?.message || "Failed to load channels"}</p>}
                {!isLoading && !isError && (
                    <ChannelsTable data={tableData} columns={["Channel Name", "Source", "Destination", "View Details"]} />
                )}

                <br /><br />

                <div className="flex justify-center items-center">
                    <Button text="Add Channel" onClickPath="/add-channels" type="button" />
                </div>

            </main>
        </div>
    )
}
