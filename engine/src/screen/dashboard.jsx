import { useQuery } from "@tanstack/react-query";

import { get_servers } from "../api/client"

import Heading, { LowerHeading } from "../components/heading"
import Button from "../components/button"
import Label from "../components/label"
import Table from "../components/table"
import SideBar from "../components/sidebar"


export default function Dashboard() {

    const { data, isLoading, isError, error, status } = useQuery({
        queryKey: ["dashboard_get_servers"],
        queryFn: get_servers,
    });

    const total_servers_connected = data?.data.length;

    return (
        <div className="flex h-screen overflow-hidden"> {/*Here it will take the full screen height */}
            <SideBar />
            {/*flex-1 will take the remaining space and overflow-y-auto will add the scrollbar if the content is more than the screen height*/}
            <main className="flex-1 overflow-y-auto p-4">
                <Heading text="Dashboard" />

                <div className="my-5 p-1 border-2 rounded-2xl border-[#7A7979]">
                    <div>
                        <Label className="text-[#32496F]" text="Total Servers Connected: " />
                        <Label className="text-[#7A7979] font-normal" text={total_servers_connected} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Today's Message Received: " />
                        <Label className="text-[#7A7979] font-normal" text={"10"} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Today's Message Sent: " />
                        <Label className="text-[#7A7979] font-normal" text={"10"} />
                    </div>
                    <div>
                        <Label className="text-[#32496F]" text="Today's Error: " />
                        <Label className="text-[#7A7979] font-normal" text={"0"} />
                    </div>
                </div>

                <hr className="border-t-2" />

                <div className="my-3 grid grid-cols-3">
                    <div className="flex items-center">
                        <LowerHeading text="Server" />
                    </div>
                    <div className="col-start-3 text-end">
                        <Button className="h-13" text="Add Server" onClickPath="/add-server" type="button" />
                    </div>
                </div>

                <div>
                    {isLoading && <p className="text-[#7A7979] font-semibold">Loading servers...</p>}
                    {isError && <p className="text-red-500 font-semibold">{error}</p>}
                    {!isLoading && !isError && <Table data={data.data} columns={["Server Name", "Protocol", "Status", "View Detail"]} />}
                </div>
            </main>
        </div>
    )
}