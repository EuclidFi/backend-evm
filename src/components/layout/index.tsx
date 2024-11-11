import React from "react";
import Navbar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
            <div className="flex-none w-full sticky top-0">
                <Navbar />
            </div>
            <div className="flex-1 flex flex-col p-10">{children}
            </div> 
        </div>
    )
}