import {Note, Section} from "@/app/dashboard/_components/sidebar/types"
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {useAccordionStore} from "@/app/_stores/accordianStore"
import DraggableSidebarRow from "@/app/dashboard/_components/sidebar/DraggableSidebarRow"
import React from "react"
import {Droppable} from "@hello-pangea/dnd"

export default function SidebarSection({ section, notes, draggingDisabled }: { section: Section, notes: Note[], draggingDisabled: boolean }) {

    const accordionStore = useAccordionStore()

    return (
        <Droppable droppableId={ section.id }>
            { (provided) =>
                <AccordionItem {...provided.droppableProps} ref={provided.innerRef} value={ section.id }>
                    <AccordionTrigger
                        className="hover:no-underline"
                        onClick={ () => accordionStore.update(section.id) }
                    >
                        { section.name }
                    </AccordionTrigger>
                    <AccordionContent>
                        {
                            notes
                                .map((note, index) =>
                                    <DraggableSidebarRow
                                        key={ note.id }
                                        index={ index }
                                        note={ note }
                                        disabled={ draggingDisabled }
                                    />
                                )
                        }
                    </AccordionContent>
                </AccordionItem>
            }
        </Droppable>
    )
}
