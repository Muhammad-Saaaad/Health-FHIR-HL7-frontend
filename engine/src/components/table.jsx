import { twMerge } from "tailwind-merge"
import { useNavigate } from "react-router-dom"

export default function Table({ data, columns }) {

    const table_header = "flex justify-center items-center font-bold text-[#152F5B] border-b-2"
    const table_content = "flex justify-center items-center font-semibold"

    const navigator = useNavigate();

    return (
        <div className="grid grid-cols-4 md:text-xl text-center">
            <div className={table_header}> {columns[0]}  </div>
            <div className={table_header}> {columns[1]}  </div>
            <div className={table_header}> {columns[2]}  </div>
            <div className={table_header}> {columns[3]}  </div>

            {
                data?.map((item, index) => {

                    let color_status = "text-green-500"
                    if (item.status === 'Inactive') {
                        color_status = "text-red-500"
                    }

                    // you should add the key to the parent container instead of child containers.
                    return <div key={index} className="col-span-full grid grid-cols-4 border-b-2 p-1 md:p-3">
                        <div className={table_content}>
                            {item.name}
                        </div>
                        <div className={table_content}>
                            {item.protocol}
                        </div>

                        <div className={twMerge(table_content, color_status)}>
                            {item.status}
                        </div>

                        <div className={twMerge(table_content, "font-bold active:text-gray-600")}>
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
                })
            }
        </div>
    )
}


export function ChannelsTable({ data, columns }) {

    const table_header = "flex justify-center items-center font-bold text-[#152F5B] border-b-2"
    const table_content = "flex justify-center items-center font-semibold text-center"

    const navigator = useNavigate();

    return (
        <div className="grid grid-cols-4 md:text-xl text-center gap-y-4">
            <div className={table_header}> {columns[0]}  </div>
            <div className={table_header}> {columns[1]}  </div>
            <div className={table_header}> {columns[2]}  </div>
            <div className={table_header}> {columns[3]}  </div>

            {
                data?.map((item, index) => {
                    // you should add the key to the parent container instead of child containers.
                    return <div key={index} className="col-span-full grid grid-cols-4 border-b-2 p-1 md:p-3">
                        <div className={table_content}>
                            {item.channel_name}
                        </div>
                        <div className={table_content}>
                            {item.source}
                        </div>

                        <div className={table_content}>
                            {item.destination}
                        </div>

                        <div className={twMerge(table_content, "font-bold active:text-gray-600")}>
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
                })
            }
        </div>
    )
}