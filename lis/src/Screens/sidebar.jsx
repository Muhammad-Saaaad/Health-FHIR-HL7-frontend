import { NavLink } from "react-router-dom";
import Label from "../components/label";

const NAV_ITEMS = [
    {
        name: "Home",
        link: "/",
        icon: "/icons/sidebar/Home.png",
        activeIcon: "/icons/sidebar/Home_blue.png",
    },
    {
        name: "Add Patient",
        link: "/ehr/add-patient",
        icon: "/icons/sidebar/Add_Patient.png",
        activeIcon: "/icons/sidebar/Add_Patient_blue.png",
    },
    {
        name: "Notification",
        link: "/ehr/notification",
        icon: "/icons/sidebar/Notification.png",
        activeIcon: "/icons/sidebar/Notification_blue.png",
    },
    {
        name: "Profile",
        link: "/ehr/profile",
        icon: "/icons/sidebar/Profile.png",
        activeIcon: "/icons/sidebar/Profile_blue.png",
    },
];

function Sidebar() {
    return (
        <aside className="h-screen w-64 bg-white border-r flex flex-col">
            <nav className="h-full flex flex-col p-4">
                <div className="flex items-center gap-2 mb-10 px-2 pt-2">
                    <img src="/icons/main/Logo-2.svg" alt="Logo" className="w-10 h-10" />
                    <Label>laboratory</Label>
                </div>

                <div className="flex-1 space-y-2">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.link}
                            className={({ isActive }) =>
                                `flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? "bg-blue-50 text-[#407CE2]"
                                    : "text-[#747474] hover:bg-gray-50 hover:text-gray-900"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <img
                                        src={isActive ? item.activeIcon : item.icon}
                                        alt={item.name}
                                        className="w-6 h-6 object-contain"
                                    />
                                    <span className="font-semibold">{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </aside>
    );
}

export default Sidebar;