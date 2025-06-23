"use client";

import { useState } from "react";
import {FiHome, FiSettings, FiMessageCircle, FiLogOut, FiMenu, FiBell} from "react-icons/fi";
import Link from "next/link";
import SidebarItem from "@/components/SidebarItem";
import {PiBrainDuotone} from "react-icons/pi";
import {IoSearchOutline} from "react-icons/io5";
import {MdAddToPhotos} from "react-icons/md";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className={`bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 ${collapsed ? 'w-18' : 'w-64'}`}>
            {/* Top nav and toggle */}
            <div className="px-2 py-2">
                <div className="flex items-center justify-between px-4 py-3 ">
                    <Link href="/" className={`text-xl font-semibold transition-all ${collapsed ? 'hidden' : 'block'}`}>
                        <PiBrainDuotone size={20} />
                    </Link>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="focus:outline-none cursor-pointer"
                    >
                        <FiMenu size={20} />
                    </button>
                </div>

                {/* Nav Links */}
                <SidebarItem href="/" icon={<FiHome size={20} />} label="Home" collapsed={collapsed} />
                <SidebarItem href="#" icon={<MdAddToPhotos size={20} />} label="New Chat" collapsed={collapsed} />
                <SidebarItem href="#" icon={<IoSearchOutline size={20} />} label="Search Chats" collapsed={collapsed} />
                <SidebarItem href="#" icon={<FiBell size={20} />} label="Notifications" collapsed={collapsed} />
                <SidebarItem href="#" icon={<FiSettings size={20} />} label="Settings" collapsed={collapsed} />
            </div>

            {/* Chats Section (in scrollable middle) */}
            <div
                className="flex-1 overflow-y-auto px-2 mt-3"
                style={{
                    scrollbarWidth: "none",       // Firefox
                    msOverflowStyle: "none",      // IE/Edge
                }}
            >
                <style jsx>{`
                    div::-webkit-scrollbar {
                        display: none; /* Chrome, Safari */
                    }
                `}</style>

                {!collapsed && (
                    <>
                        <div className="px-4 mb-2 text-gray-400 text-sm">Chats</div>

                        <button
                            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                            John from Tech Support
                        </button>
                        <button
                            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                            Jane from HR Team
                        </button>
                        <button
                            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                            AI Chat Assistant Bot
                        </button>
                    </>
                )}
            </div>

            {!collapsed ? (
                <div className="p-4 border-t border-gray-700">
                    <div className="text-center">
                        <p className="text-sm text-gray-400">Crafted with ❤️ by</p>
                        <p className="text-sm font-semibold text-gray-300">Dip Kor Imon</p>
                        <div className="mt-2 flex justify-center gap-4 text-gray-400 text-sm">
                            <a
                                href="https://www.linkedin.com/in/dipkorimon"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-colors"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="mailto:dipkorimon@gmail.com"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Email
                            </a>
                            <a
                                href="https://github.com/dipkorimon"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-colors"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-4 border-t border-gray-700 flex justify-center items-center">
                    <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                            <span
                                key={i}
                                className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            />
                        ))}
                    </div>
                </div>

            )}



        </aside>
    );
}
