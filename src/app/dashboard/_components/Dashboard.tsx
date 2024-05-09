import React from "react"

import NoteEditor from "@/app/dashboard/_components/NoteEditor"

export default function Dashboard({ noteId }: { noteId?: string }) {
    return noteId && <NoteEditor noteId={ noteId } />
}
