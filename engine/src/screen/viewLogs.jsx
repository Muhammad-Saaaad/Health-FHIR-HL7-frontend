import { useQuery } from "@tanstack/react-query";
import { ChevronRight, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { get_logs } from "../api/logs";
import Sidebar from "../components/sidebar";
import Heading from "../components/heading";

const formatDateTime = (isoString) => {
    const dateTime = new Date(isoString);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    return { date, time };
};

export default function ViewLogs() {

    const navigate = useNavigate();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['logs'],
        queryFn: get_logs
    });

   
    return <div className="flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-3">
            <Heading text="Message Logs" />
            <br />
            {data?.map((log, idx) => (
                
                <div 
                    key={idx}
                    className="flex justify-between items-center p-2 m-2 rounded-xl shadow-lg gap-4 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/log-message", { state: { log_id: log.log_id }})}
                >
                    <div className="flex gap-4">
                        <div>
                            {
                                log.status === "Success" ?
                                    <Check className="text-white bg-green-500 rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" /> : 
                                    <X className="text-white bg-red-600 rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />}
                        </div>
                        <div>
                            <p className="font-extrabold text-[#152F5B]">{log.operation_heading}</p>
                            <p className="font-bold text-[#152F5B]">{log.operation_message}</p>
                            <p className={log.status === "Success" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                                {log.status}
                            </p>
                            <div className="flex gap-4 text-sm text-gray-700">
                                <p>{formatDateTime(log.datetime).date}</p>
                                <p>{formatDateTime(log.datetime).time}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ChevronRight />
                    </div>
                </div>
            ))}
        </main>
    </div>
}