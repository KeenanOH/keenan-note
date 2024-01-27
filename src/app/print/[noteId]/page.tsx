import React from "react"
import { Document } from "@react-pdf/renderer"

import Markdown from "@/app/_components/Markdown"
import { useServerSession } from "@/server/app"

export default async function Note({ params }: { params: { noteId: string } }) {

    const { caller } = await useServerSession()

    try {
        const note = await caller.note.getNote({ id: params.noteId })

        return (
            <div className="flex md:justify-center w-screen h-screen">
                <Document>
                    <Markdown>
                        { note.content }
                    </Markdown>
                </Document>
            </div>
        )
    } catch {
        return <p>This note is not public.</p>
    }
}
