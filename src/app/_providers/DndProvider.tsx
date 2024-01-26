import React, {useState} from "react"
import {DndContext, DragEndEvent, DragOverlay, DragStartEvent} from "@dnd-kit/core"
import SidebarRow from "@/app/dashboard/_components/sidebar/SidebarRow"
import {Note} from "@/app/dashboard/_components/sidebar/types"
import {trpc} from "@/utils/trpc"
import {useRouter} from "next/navigation"

export default function DndProvider({ children }: { children: React.ReactNode }) {

    const [activeNote, setActiveNote] = useState<Note>()
    const updateNote = trpc.newNote.updateNote.useMutation()
    const router = useRouter()

    function handleDragStart(event: DragStartEvent) {
        setActiveNote(event.active.data.current as Note)
    }

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event
        if (over) {
            updateNote.mutateAsync({ id: active.id as string, sectionId: over.id as string })
                .then(() => router.refresh())
        }

        setActiveNote(undefined)
    }

    return (
        <DndContext onDragStart={ handleDragStart } onDragEnd={ handleDragEnd }>
            { children }

            <DragOverlay>
                { activeNote &&
                    <SidebarRow note={ activeNote } />
                }
            </DragOverlay>
        </DndContext>
    )
}
