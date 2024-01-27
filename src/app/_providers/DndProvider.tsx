import React from "react"
import {DragDropContext, DropResult} from "@hello-pangea/dnd"
import {trpc} from "@/utils/trpc"
import {useRouter} from "next/navigation"
import {useNoteStore} from "@/app/_stores/noteStore"

export default function DndProvider({ children }: { children: React.ReactNode }) {

    const updateNote = trpc.newNote.updateNote.useMutation()
    const router = useRouter()
    const noteStore = useNoteStore()

    function handleDragEnd(result: DropResult) {
        const noteId = result.draggableId
        const sectionId = result.destination?.droppableId

        if (!sectionId) return

        noteStore.update(noteId, sectionId)
        updateNote.mutateAsync({ id: noteId, sectionId })
            .then(() => router.refresh())
    }

    return (
        <DragDropContext onDragEnd={ handleDragEnd }>
            { children }
        </DragDropContext>
    )
}
