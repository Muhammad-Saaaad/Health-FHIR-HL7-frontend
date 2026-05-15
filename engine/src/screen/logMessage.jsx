import { useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";

import { get_log_detail } from "../api/logs";
import Sidebar from "../components/sidebar";
import Heading from "../components/heading";
import Label from "../components/label";

export default function LogMessage() {

    const navigate = useNavigate();
    const location = useLocation();
    const log_id = location.state?.log_id;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['log_detail', log_id],
        queryFn: async () => await get_log_detail(log_id),
        enabled: !!log_id,
        retry:false
    });
   
    return <div className="flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-3">
            <Heading text="Message Viewer" />
            <br /><br />
    
            <Label text="Src Message:" className="text-[#152F5B]" />
            <br /><br />
            <textarea
                className="border border-gray-500 rounded-2xl w-full min-h-40 max-h-100 p-3 text-sm text-gray-700 resize-none overflow-y-scroll"
                readOnly
                value={data?.src_message || "No Src Message available."}
            />
            <br />

            <Label text="Dest Message:" className="text-[#152F5B]" />
            <br /><br />
            <textarea
                className="border border-gray-500 rounded-2xl w-full min-h-40 max-h-100 p-3 text-sm text-gray-700 resize-none overflow-y-scroll"
                readOnly
                value={data?.dest_message || "No Dest Message available."}
            />
            <br /><br />

        </main>
    </div>
}