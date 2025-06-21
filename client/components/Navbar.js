"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import {FiHelpCircle, FiInfo, FiLogOut, FiMail, FiSettings, FiTrendingUp} from "react-icons/fi";
import {RiLockPasswordLine} from "react-icons/ri";

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setIsLoggedIn(true);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = async () => {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/logout/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            });

            if (res.ok) {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                setDropdownOpen(false);

                setTimeout(() => {
                    router.push("/");
                }, 1500);
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-10 py-3 flex items-center justify-between">
            <div className="text-3xl font-semibold text-blue-600"><Link href="/">InstaInsight</Link></div>
            <Link
                href="/whats-new"
                className="bg-gray-100 text-gray-800 px-5 py-2 rounded-lg shadow-sm flex items-center gap-3 hover:bg-gray-200 transition-all text-sm"
            >
                <FiInfo className="text-blue-600 animate-bounce" size={18} />
                <span className="font-medium">
    Discover what’s new in <span className="font-semibold">InstaInsight</span>
  </span>
            </Link>



            {!isLoggedIn ? (
                <Link
                    href="/auth/login/"
                    className="px-6 py-2 font-medium tracking-wide text-dark capitalize transition-colors duration-300 transform bg-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none cursor-pointer"
                >
                    Sign In
                </Link>
            ) : (
                <div className="relative flex gap-5" ref={dropdownRef}>
                    <Link
                        href="#"
                        className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-sm font-semibold rounded-lg shadow hover:from-yellow-500 hover:to-yellow-700 flex items-center gap-2"
                    >
                        <FiTrendingUp />
                        Upgrade Plan
                    </Link>
                    <button
                        onClick={toggleDropdown}
                        className="text-gray-700 hover:text-black focus:outline-none cursor-pointer"
                        aria-label="User menu"
                    >
                        <FaUserCircle size={28}/>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-10 w-auto min-w-[250px] bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            <ul className="text-sm text-gray-700 p-2">
                                <li className="px-4 py-2 text-gray-400 cursor-pointer flex items-center gap-2">
                                    <FiMail className="text-gray-400" />
                                    name@company.com
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                    <RiLockPasswordLine className="text-gray-500" />
                                    <Link href="/auth/change-password/">Change Password</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                    <FiTrendingUp className="text-gray-500" />
                                    <Link href="#">Upgrade Plan</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                    <FiSettings className="text-gray-500" />
                                    <Link href="#">Settings</Link>
                                </li>
                                <hr className="border-gray-200" />
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                                    <FiHelpCircle className="text-gray-500" />
                                    <Link href="#">Help</Link>
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 flex items-center gap-2"
                                    onClick={handleLogout}
                                >
                                    <FiLogOut className="text-red-500" />
                                    <Link href="#">Log out</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
