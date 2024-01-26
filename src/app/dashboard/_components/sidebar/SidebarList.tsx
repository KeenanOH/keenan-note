"use client"

import React, {useState} from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useAccordionStore } from "@/app/_stores/stores"
import { Note, Section } from "@/app/dashboard/_components/sidebar/types"
import DraggableSidebarRow from "@/app/dashboard/_components/sidebar/DraggableSidebarRow"
import SidebarSection from "@/app/dashboard/_components/sidebar/SidebarSection"
import {Toggle} from "@/components/ui/toggle"
import AddDropDownMenu from "@/app/dashboard/_components/dropdowns/AddDropdownMenu"

export default function SidebarList({ notes, sections }: { notes: Note[], sections: Section[] }) {

    const accordionStore = useAccordionStore()
    const [editingDisabled, setEditingDisabled] = useState(true)

    return (
        <div>
            <div className="flex items-center">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Notes</h3>
                <div className="ml-auto flex items-center">
                    <Toggle onClick={ () => setEditingDisabled(editing => !editing) }>{ editingDisabled ? "Edit" : "Finish" }</Toggle>
                    <AddDropDownMenu />
                </div>
            </div>
            <Accordion type="multiple" className="w-full" value={ accordionStore.open }>
                <AccordionItem key="Unfilled" value="Unfilled">
                    <AccordionTrigger
                        className="hover:no-underline"
                        onClick={ () => accordionStore.update("Unfilled") }
                    >
                        Unfilled
                    </AccordionTrigger>
                    <AccordionContent>
                        {
                            notes
                                .filter(note => !note.sectionId)
                                .map(note =>
                                    <DraggableSidebarRow key={ note.id } note={ note } disabled={ editingDisabled } />
                                )
                        }
                    </AccordionContent>
                </AccordionItem>
                {
                    sections.map(section =>
                        <SidebarSection
                            key={ section.id }
                            section={ section }
                            notes={ notes.filter(note => note.sectionId === section.id) }
                            draggingDisabled={ editingDisabled }
                        />
                    )
                }
            </Accordion>
        </div>
    )
}
