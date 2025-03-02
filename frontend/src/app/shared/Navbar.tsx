"use client"; // Ensure it's a client component

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/index";
import Link from "next/link";

const Navbar = () => {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
 console.log("user", user, isAuthenticated);
 
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container-fluid">
                <Link href="/" className="text-xl font-bold">Dashboard</Link>
                {isAuthenticated && user ? (
                    <div className="flex items-center space-x-4">
                        <span>Welcome, {user.name || user.email}</span>
                        <Link href="/profile" className="px-3 py-1 bg-blue-600 rounded">Profile</Link>
                    </div>
                ) : (
                    <Link href="/auth/login" className="px-3 py-1 bg-green-600 rounded">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
