"use client";

import {FiSettings, FiMenu, FiBell} from "react-icons/fi";
import SidebarItem from "@/components/SidebarItem";
import {IoSearchOutline} from "react-icons/io5";
import {MdAddToPhotos} from "react-icons/md";
import DeveloperInfo from "@/components/DeveloperInfo";
import BounceAnimation from "@/components/BounceAnimation";
import Chats from "@/components/Chats";
import SidebarToggle from "@/components/SIdebarToggle";
import {useState} from "react";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className={`bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 ${collapsed ? 'w-18' : 'w-64'}`}>
            {/* Top nav and toggle */}
            <div className="px-2 py-2">
                <SidebarToggle onClick={() => setCollapsed(!collapsed)} collapsed={collapsed}/>

                {/* Nav Links */}
                <SidebarItem href="#" icon={<MdAddToPhotos size={20} />} label="New Chat" collapsed={collapsed} />
                <SidebarItem href="#" icon={<IoSearchOutline size={20} />} label="Search Chats" collapsed={collapsed} />
                <SidebarItem href="#" icon={<FiBell size={20} />} label="Notifications" collapsed={collapsed} />
                <SidebarItem href="#" icon={<FiSettings size={20} />} label="Settings" collapsed={collapsed} />
            </div>

            {/* Chats Section (in scrollable middle) */}
            <Chats collapsed={collapsed}/>

            {!collapsed ? (
                <DeveloperInfo
                    name="Dip Kor Imon"
                    linkedInProfile="https://www.linkedin.com/in/dipkorimon"
                    email="mailto:dipkorimon@gmail.com"
                    github="https://github.com/dipkorimon"
                />
            ) : (
                <BounceAnimation />
            )}
        </aside>
    );
}
