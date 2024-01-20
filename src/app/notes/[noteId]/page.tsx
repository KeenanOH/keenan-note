"use client"

import React from "react"
import Markdown from "react-markdown"

import { ScrollArea } from "@/components/ui/scroll-area"
import { trpc } from "@/utils/trpc"
import LoadingScreen from "@/app/_components/LoadingScreen"

export default function Note({ params }: { params: { noteId: string }}) {

    const note = trpc.note.getNote.useQuery({ id: params.noteId })

    if (note.isLoading)
        return <LoadingScreen />

    if (!note.data)
        return <p>This note is not public.</p>

    return (
        <ScrollArea>
            <div className="w-screen h-screen">
                <Markdown className="prose p-8">
                    { note.data.content }
                </Markdown>
            </div>
        </ScrollArea>
    )
}
