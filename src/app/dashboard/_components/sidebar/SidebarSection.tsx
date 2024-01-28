import {Note, Section} from "@/app/dashboard/_components/sidebar/types"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger, AccordionHeader} from "@/components/ui/accordion"
import {useAccordionStore} from "@/app/_stores/accordianStore"
import DraggableSidebarRow from "@/app/dashboard/_components/sidebar/DraggableSidebarRow"
import React, {useEffect, useState} from "react"
import {Droppable} from "@hello-pangea/dnd"

export default function SidebarSection({ section, notes, draggingDisabled }: { section: Section, notes: Note[], draggingDisabled: boolean }) {

    const accordionStore = useAccordionStore()
    const [value, setValue] = useState("")

    useEffect(() => {
        setValue(accordionStore.get(section.id))
    }, [accordionStore, section])

    return (
        <Accordion type="single" className="w-full" value={ value }>
            <Droppable droppableId={ section.id } type="NOTE">
                { provided =>
                    <AccordionItem {...provided.droppableProps} ref={provided.innerRef} value={ section.id } >
                        { draggingDisabled ?
                            <AccordionTrigger
                                className="hover:no-underline"
                                onClick={ () => accordionStore.toggle(section.id) }
                            >
                                {section.name }
                            </AccordionTrigger>
                            :
                            <AccordionHeader>
                                { section.name }
                            </AccordionHeader>
                        }
                        <AccordionContent>
                            { notes.map((note, index) =>
                                <DraggableSidebarRow
                                    key={ note.id }
                                    note={ note }
                                    disabled={ draggingDisabled }
                                    index={ index }
                                />
                            ) }
                        </AccordionContent>
                        { provided.placeholder }
                    </AccordionItem>
                }
            </Droppable>
        </Accordion>
    )
}
