import React from "react"
import {DragDropContext, DropResult} from "@hello-pangea/dnd"
import {trpc} from "@/utils/trpc"
import {useNoteStore} from "@/app/_stores/noteStore"
import {useSectionStore} from "@/app/_stores/sectionStore"
import {Section} from "@/app/dashboard/_components/sidebar/types"

export default function DndProvider({ children }: { children: React.ReactNode }) {

    const updateNote = trpc.newNote.updateNote.useMutation()
    const updateSection = trpc.section.updateSection.useMutation()
    const noteStore = useNoteStore()
    const sectionStore = useSectionStore()

    function handleDragEnd(result: DropResult) {
        const idSplit = result.draggableId.split("-")
        const noteId = idSplit[1]
        const type = idSplit[0]
        const position = result.destination?.index

        if (!result.destination?.droppableId || typeof position === "undefined") return

        if (type === "NOTE") {
            const sectionId = result.destination.droppableId
            const updatedSectionId = sectionId === "Unfilled" ? null : sectionId

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

            if (notes.length === 0)
                newNotes.push({id: noteId, sectionId})

            newNotes.map((note, index) => {
                noteStore.update(note.id, updatedSectionId, index)
                updateNote.mutate({id: note.id, sectionId: updatedSectionId, position: index})
            })
        }

        if (type === "SECTION") {
            const editedSection = sectionStore.sections.find(section => section.id === noteId)
            if (!editedSection) return

            const sections = sectionStore.sections.filter(section => section.id != noteId)
            const newSections: Section[] = []

            for (let i = 0; i < sections.length; i++) {
                if (i === position)
                    newSections.push({ ...editedSection })

                newSections.push({ id: sections[i].id, name: sections[i].name, position: i })
            }

            newSections.map((section, index) => {
                console.log(section.name, index)
                sectionStore.update(section.id, index)
                updateSection.mutate({ id: section.id, position: index })
            })
        }
    }

    return (
        <DragDropContext onDragEnd={ handleDragEnd }>
            { children }
        </DragDropContext>
    )
}
