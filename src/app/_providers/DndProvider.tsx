import React from "react"
import {DragDropContext, DropResult} from "@hello-pangea/dnd"
import {trpc} from "@/utils/trpc"
import {useNoteStore} from "@/app/_stores/noteStore"
import {useRouter} from "next/navigation"

export default function DndProvider({ children }: { children: React.ReactNode }) {

    const updateNote = trpc.newNote.updateNote.useMutation()
    const noteStore = useNoteStore()
    const router = useRouter()

    function handleDragEnd(result: DropResult) {
        const noteId = result.draggableId
        const sectionId = result.destination?.droppableId
        const position = result.destination?.index

        if (!sectionId || typeof position === "undefined") return

        noteStore.update(noteId, sectionId)
        const addedNote = noteStore.notes.find(note => note.id === noteId)
        if (!addedNote) return

        const notes = noteStore.notes.filter(note => note.sectionId === sectionId)

        notes.splice(notes.indexOf(addedNote), 1)
        notes.splice(position, 0, addedNote)

        notes.map((note, index) => {
            updateNote.mutate({id: note.id, sectionId, position: index})
        })

        router.refresh()
    }

    return (
        <DragDropContext onDragEnd={ handleDragEnd }>
            { children }
        </DragDropContext>
    )
}
