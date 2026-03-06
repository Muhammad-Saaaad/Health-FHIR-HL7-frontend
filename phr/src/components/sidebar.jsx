import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, User, Menu, X, } from "lucide-react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Auto-open on desktop (≥ 768px) on first render
    useEffect(() => {
        if (window.innerWidth >= 768) {
            setIsOpen(true);
        }
    }, []);

    const menuItems = [
        { icon: Home, label: 'Home', path: '/home'},
        { icon: User, label: 'Profile', path: '/profile'},
    ];

    const handleNavigate = (path) => {
        navigate(path);
        // Auto-close on mobile after tapping a nav item
        if (window.innerWidth < 768) setIsOpen(false);
    };

    return (
        <>
            {/*
                MOBILE PLACEHOLDER
                This invisible div takes up w-14 (56px) in the flex row on mobile.
                It sits where the collapsed sidebar button lives, so the <main> content
                starts to the RIGHT of the toggle button instead of being hidden under it.
                Hidden on desktop (md:hidden) because the <aside> itself is in the flex flow there.
            */}
            <div className="w-14 shrink-0 md:hidden" />

            {/* Dark backdrop — mobile only, click anywhere outside to close */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/*
                THE SIDEBAR PANEL
                Mobile  (< md): fixed overlay — sits on top of content as a drawer.
                                 Closed = w-14 (just the button visible).
                                 Open   = w-64 (slides over content with backdrop behind).
                Desktop (≥ md): relative flex item — never overlays content.
                                 Closed = md:w-16 (icon-only strip).
                                 Open   = md:w-64 (full sidebar).
            */}
            <aside
                className={`
                    h-screen bg-white border-r border-gray-200
                    transition-all duration-300 ease-in-out

                    fixed inset-y-0 left-0 z-40
                    ${isOpen ? 'w-64' : 'w-14'}

                    md:relative md:z-auto md:shrink-0
                    ${isOpen ? 'md:w-64' : 'md:w-16'}
                `}
            >
                {/* Header — toggle button + title */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-1.5 bg-[#31486F] text-white rounded-lg shrink-0"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    {isOpen && (
                        <h1 className="text-xl font-bold text-[#31486F] whitespace-nowrap overflow-hidden">
                            Health Care
                        </h1>
                    )}
                </div>

                {/* Nav items */}
                <nav className="p-2 space-y-1">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <button
                                key={index}
                                onClick={() => handleNavigate(item.path)}
                                className={`
                                    w-full flex items-center gap-4 px-3 py-3 rounded-lg
                                    transition-colors duration-200 whitespace-nowrap
                                    ${isActive
                                        ? 'bg-[#31486F] text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }
                                `}
                            >
                                <Icon size={20} className={'shrink-0'} />
                                {isOpen && <span className="font-medium">{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}