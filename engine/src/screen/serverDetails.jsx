import { useLocation } from "react-router-dom"

import Heading from "../components/heading"
import Label from "../components/label"
import Textbox from "../components/textbox"
import Button from "../components/button"
import Sidebar from "../components/sidebar"

function ServerDetails(){

    const location = useLocation();
    let userData = location.state;

    if (userData === null){
        userData = {
            "server_name": "",
            "Protocol": "",
            "status": "",
            "IP": "",
            "Port": ""
        }
    }

    let color_status = "text-green-500"
    if (userData.status === 'Inactive'){
        color_status = "text-red-500"
    }

    const SubmitEvent = () => {
        return;
    }

    return (
        <div className="flex overflow-hidden h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4">
        
                <form className="p-3" onSubmit={SubmitEvent}>
                    <Heading text="Server Details" />
                    <br />

                    <Label text="Server Name" />
                    <br />
                    <Textbox value={userData.server_name} readOnly={true} />
                    <br />
                    
                    <Label text="Protocol" />
                    <br />
                    <Textbox value={userData.protocol} readOnly={true} />
                    <br />
                    
                    <Label text="Status" />
                    <br />
                    <Textbox value={userData.status} className={color_status} readOnly={true} />
                    <br />
                    
                    <Label text="IP" />
                    <br />
                    <Textbox value={userData.ip} readOnly={true} />
                    <br />
                    
                    <Label text="Port" />
                    <br />
                    <Textbox value={userData.port} readOnly={false} />
                    <br /><br />

                    <div className="flex justify-center space-x-10 md:space-x-20 lg:space-x-40">
                        <Button className="w-40" text="Edit"></Button>
                        <Button className="w-40 bg-gray-200 text-[#202020]" text="Delete"></Button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default ServerDetails;