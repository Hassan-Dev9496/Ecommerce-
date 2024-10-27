"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import useStore from "@/store/user";

export default function AuthControls({ token }: { token: string | null }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const clearUser = useStore((state) => state.clearUser);
    const router = useRouter();

    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentToken = getCookie("token");
            if (currentToken) {
                setIsAuthenticated(true);
                router.refresh();
                clearInterval(interval);
            }
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        deleteCookie("token");
        setIsAuthenticated(false);
        clearUser();
        router.push("/");
    };

    return (
        <>
            {isAuthenticated ? (
                <p onClick={handleLogout} className="cursor-pointer">Logout</p>
            ) : (
                <Link href="/login">Login</Link>
            )}
        </>
    );
}
