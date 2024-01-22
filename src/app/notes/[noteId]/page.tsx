import React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import Markdown from "@/app/_components/Markdown"
import { useServerSession } from "@/server/app"

export default async function Note({ params }: { params: { noteId: string } }) {

    const { caller } = await useServerSession()

    try {
        const note = await caller.note.getNote({ id: params.noteId })

        return (
            <ScrollArea>
                <div className="flex justify-center w-screen h-screen">
                    <Markdown>
                        { note.content }
                    </Markdown>
                </div>
            </ScrollArea>
        )
    } catch {
        return <p>This note is not public.</p>
    }
}
