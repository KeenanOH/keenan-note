import {Note, Section} from "@/app/dashboard/_components/sidebar/types"
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {useAccordionStore} from "@/app/_stores/stores"
import DraggableSidebarRow from "@/app/dashboard/_components/sidebar/DraggableSidebarRow"
import React from "react"
import {useDroppable} from "@dnd-kit/core"

export default function SidebarSection({ section, notes, draggingDisabled }: { section: Section, notes: Note[], draggingDisabled: boolean }) {

    const accordionStore = useAccordionStore()
    const {  setNodeRef } = useDroppable({
        id: section.id
    })

    return (
        <AccordionItem ref={ setNodeRef } value={ section.id }>
            <AccordionTrigger
                className="hover:no-underline"
                onClick={ () => accordionStore.update(section.id) }
            >
                { section.name }
            </AccordionTrigger>
            <AccordionContent>
                {
                    notes
                        .map(note =>
                            <DraggableSidebarRow key={ note.id } note={ note } disabled={ draggingDisabled } />
                        )
                }
            </AccordionContent>
        </AccordionItem>
    )
}
