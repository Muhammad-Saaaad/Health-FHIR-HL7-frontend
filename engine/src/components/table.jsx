import { twMerge } from "tailwind-merge"
import { useNavigate } from "react-router-dom"

export default function Table({ data }) {
    const navigator = useNavigate();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:text-xl text-center ">
            {
                data?.map((item, index) => {

                    let color_status = "text-green-500"
                    if (item.status === 'Inactive') {
                        color_status = "text-red-500"
                    }

                    // you should add the key to the parent container instead of child containers.
                    return <div key={index} className="m-2 border-2 border-gray-400 rounded-lg px-2 py-1 shadow-lg">
                        <div className="font-extrabold text-[#152F5B] text-xl text-start">
                            {item.name}
                        </div>
                        <hr />

                        <div className="flex justify-between mt-1">
                            <div>
                                <div>
                                    <p className="font-bold inline-block text-lg">Protocol:</p>
                                    {" "+item.protocol}
                                </div>
                                <div className={twMerge(color_status, "text-start font-semibold")}>
                                    {item.status}
                                </div>
                            </div>


                            <div className={"text-lg flex justify-center items-end font-bold active:text-gray-600"}>
                                <button
                                    onClick={
                                        () => navigator("/server-details",
                                            {
                                                state: {
                                                    "server_name": item.name,
                                                    "protocol": item.protocol,
                                                    "status": item.status,
                                                    "ip": item.ip,
                                                    "port": item.port
                                                }
                                            })
                                    }
                                >
                                    View {">"}
                                </button>
                            </div>

                        </div>

                    </div>
                })
            }
        </div>
    )
}


export function ChannelsTable({ data }) {

    const navigator = useNavigate();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:text-xl text-center ">
            {
                data?.map((item, index) => {

                    // you should add the key to the parent container instead of child containers.
                    return <div key={index} className="m-2 border-2 border-gray-400 rounded-lg px-2 py-1 shadow-lg">
                        <div className="font-extrabold text-[#152F5B] text-xl text-start">
                            {item.channel_name}
                        </div>
                        <hr />

                        <div className="flex justify-between mt-1">
                            <div className="text-start">
                                <div>
                                    <p className="font-bold inline-block text-lg">source:</p>
                                    {" "+item.source}
                                </div>
                                <div>
                                    <p className="font-bold inline-block text-lg">destination:</p>
                                    {" "+item.destination}
                                </div>
                                
                            </div>


                            <div className="text-lg flex justify-center items-end text-center font-bold active:text-gray-600">
                            <button
                                onClick={
                                    () => navigator("/channel-details",
                                        {
                                            state: item.raw
                                        })
                                }
                            >
                                View {">"}
                            </button>
                        </div>

                        </div>

                    </div>
                })
            }
        </div>

        // <div className="grid grid-cols-4 md:text-xl text-center gap-y-4">
           
        //     {
        //         data?.map((item, index) => {
        //             // you should add the key to the parent container instead of child containers.
        //             return <div key={index} className="col-span-full grid grid-cols-4 border-b-2 p-1 md:p-3">
        //                 <div className={table_content}>
        //                     {item.channel_name}
        //                 </div>
        //                 <div className={table_content}>
        //                     {item.source}
        //                 </div>

        //                 <div className={table_content}>
        //                     {item.destination}
        //                 </div>

        //                 

        //             </div>
        //         })
        //     }
        // </div>
    )
}