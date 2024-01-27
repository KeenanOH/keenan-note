import React from "react"

import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area"
import Markdown from "@/app/_components/Markdown"
import { useServerSession } from "@/server/app"

export default async function Note({ params }: { params: { noteId: string } }) {

    const { caller } = await useServerSession()

    try {
        const note = await caller.note.getNote({ id: params.noteId })

        return (
            <ScrollArea>
                <ScrollArea>
                    <div className="flex md:justify-center w-screen h-screen">
                        <Markdown>
                            { note.content }
                        </Markdown>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </ScrollArea>
        )
    } catch {
        return <p>This note is not public.</p>
    }
}
