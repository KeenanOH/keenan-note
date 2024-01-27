import React from "react"
import {DragDropContext, DropResult} from "@hello-pangea/dnd"
import {trpc} from "@/utils/trpc"
import {useNoteStore} from "@/app/_stores/noteStore"

export default function DndProvider({ children }: { children: React.ReactNode }) {

    const updateNote = trpc.newNote.updateNote.useMutation()
    const noteStore = useNoteStore()

    function handleDragEnd(result: DropResult) {
        const noteId = result.draggableId
        const sectionId = result.destination?.droppableId
        const position = result.destination?.index

        if (!sectionId || typeof position === "undefined") return
        noteStore.update(noteId, sectionId)

        const notes = noteStore.notes
            .filter(note => note.sectionId === sectionId && note.id != noteId)
            .sort((lhs, rhs) => {
                return lhs.position > rhs.position ? 1 : -1
            })
        const newNotes: { id: string, sectionId: string | null }[] = []

        for (let i = 0; i < notes.length; i++) {
            if (i === position)
                newNotes.push({id: noteId, sectionId})

            newNotes.push({ id: notes[i].id, sectionId: notes[i].sectionId })

        }

        newNotes.map((note, index) => {
            noteStore.update(note.id, note.sectionId, index)
            updateNote.mutate({id: note.id, sectionId, position: index})
        })
    }

    return (
        <DragDropContext onDragEnd={ handleDragEnd }>
            { children }
        </DragDropContext>
    )
}
