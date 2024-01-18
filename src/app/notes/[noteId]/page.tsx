"use client"

import Markdown from "react-markdown"

import { ScrollArea } from "@/components/ui/scroll-area"
import { trpc } from "@/utils/trpc"
import LoadingScreen from "@/app/_components/LoadingScreen"

export default function Note({ params }: { params: { noteId: string }}) {

    const note = trpc.note.getNote.useQuery({ id: params.noteId })

    if (note.isLoading)
        return (
            <LoadingScreen />
        )

    if (!note.data)
        return (
            <p>This note is not public.</p>
        )

    return (
        <ScrollArea className="w-screen h-screen prose">
            <Markdown className="p-8">
                { note.data.content }
            </Markdown>
        </ScrollArea>
    )
}
