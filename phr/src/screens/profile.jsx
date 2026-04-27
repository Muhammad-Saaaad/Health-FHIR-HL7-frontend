import Sidebar from "../components/sidebar";

import Heading from "../components/heading";
import Label from "../components/label";
import Textbox from "../components/textbox";

export default function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));

    let dob = user?.date_of_birth;
    let today_date = new Date();
    let age = today_date.getFullYear() - new Date(dob).getFullYear();

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto px-3">
                <div className="flex justify-center">
                    <Heading text="Profile" />
                </div>

                <div className="flex flex-col justify-center sm:items-center gap-6 mt-6">
                    <div>
                        <Label text="Name: " />
                        <Textbox className="shrink-0 font-normal" readOnly={true} value={user?.name} />
                    </div>
                    <div>
                        <Label text="Age: " />
                        <Textbox className="shrink-0 font-normal" readOnly={true} value={(age)} />
                    </div>
                    <div>
                        <Label text="Gender: " />
                        <Textbox className="shrink-0 font-normal" readOnly={true} value={(user?.gender)} />
                    </div>
                    <div>
                        <Label text="NIC: " />
                        <Textbox className="shrink-0 font-normal" readOnly={true} value={user?.nic} />
                    </div>
                    <div>
                        <Label text="Phone no: " />
                        <Textbox className="shrink-0 font-normal" readOnly={true} value={user?.phone_no} />
                    </div>
                    <div>
                        <Label text="Address: " />
                        <Textbox className="shrink-0 font-normal" readOnly={true} multiline={true} rows={3} value={(user?.address)} />
                    </div>
                    
                </div>
                <br /><br />
                
            </main>
 
        </div>
    );
}