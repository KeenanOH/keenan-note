import React from "react"

import Sidebar from "@/app/dashboard/_components/sidebar/Sidebar"
import NoteEditor from "@/app/dashboard/_components/NoteEditor"

export default function Dashboard({ noteId }: { noteId?: string }) {

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start p-8 gap-x-8 gap-y-8 h-screen">
            <Sidebar />
            { noteId &&
                <NoteEditor noteId={ noteId } />
            }
        </div>
    )
}
