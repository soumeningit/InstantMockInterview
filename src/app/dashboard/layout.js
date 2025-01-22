"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import LogoutModal from "@/component/LogoutModal";

export default function DashboardLayout({ children }) {
    const userId = useSelector((state) => state.auth.user);
    console.log("userId : " + userId);
    const [activeLink, setActiveLink] = useState(null);
    const [open, setOpen] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Toggle Sidebar on Mobile
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const links = [
        { id: 1, name: "Profile", link: `/dashboard/profile/${userId}`, icon: "user" },
        { id: 2, name: "Dashboard", link: "/dashboard", icon: "dashboard" },
        { id: 3, name: "Settings", link: "/dashboard/settings", icon: "settings" },
        // { id: 4, name: "Messages", link: "/messages", icon: "message" },
        // { id: 5, name: "Notifications", link: "/notifications", icon: "bell" },
        // { id: 6, name: "Logout", link: "/logout", icon: "logout" },
    ];

    const handleLinkClick = (id) => {
        setActiveLink(id);
    };

    const showModal = () => {
        setOpen(!open);
    }

    return (
        <div className="flex min-h-screen">
            <aside className="w-[14rem] bg-[#bbbabadf] p-4 min-h-screen fixed">
                {links.map((data) => (
                    <div key={data.id}
                        className={`transition duration-300 p-2 ${activeLink === data.id
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-500 hover:bg-slate-200'
                            }`}
                    >
                        <Link href={data.link} onClick={() => handleLinkClick(data.id)}>
                            {data.name}
                        </Link>
                    </div>
                ))}
                <button
                    onClick={showModal}
                    className="px-2 py-1 rounded-md translate-y-80">
                    Logout
                </button>
                {
                    open && <LogoutModal setOpen={setOpen} />
                }
            </aside>
            <main className="flex-1 p-6 min-h-screen ml-[14rem] bg-[rgba(203,201,201,0.48)]">
                {children} {/* This will render the page content dynamically */}
            </main>
        </div>
    );
}
