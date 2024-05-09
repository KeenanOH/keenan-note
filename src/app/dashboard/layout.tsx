import Sidebar from "@/app/dashboard/_components/sidebar/Sidebar"
import React from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start p-8 gap-x-8 gap-y-8 h-screen">
            <Sidebar />
            { children }
        </div>
    )
}
