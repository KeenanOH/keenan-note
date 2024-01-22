import React from "react"

import Dashboard from "@/app/dashboard/_components/Dashboard"

export default function DashboardPage({ params }: { params: { noteId: string } }) {
    return (
        <Dashboard noteId={ params.noteId } />
    )
}
