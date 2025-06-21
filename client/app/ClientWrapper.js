"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ClientWrapper({ children }) {
    const pathname = usePathname();

    // Hide Navbar on these paths
    const hideNavbar =
        pathname === "/auth/login" || pathname === "/authregister/register" || pathname === "/auth/password-reset" || pathname === "/auth/password-reset-confirm";

    return (
        <>
            {!hideNavbar && <Navbar />}
            {children}
        </>
    );
}
