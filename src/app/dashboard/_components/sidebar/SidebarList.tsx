"use client"

import React, {useEffect, useState} from "react"

import { Accordion } from "@/components/ui/accordion"
import { useAccordionStore } from "@/app/_stores/accordianStore"
import { Note, Section } from "@/app/dashboard/_components/sidebar/types"
import SidebarSection from "@/app/dashboard/_components/sidebar/SidebarSection"
import {Toggle} from "@/components/ui/toggle"
import AddDropDownMenu from "@/app/dashboard/_components/dropdowns/AddDropdownMenu"
import { useNoteStore } from "@/app/_stores/noteStore"

export default function SidebarList({ notes, sections }: { notes: Note[], sections: Section[] }) {

    const accordionStore = useAccordionStore()
    const noteStore = useNoteStore()

    const [editingDisabled, setEditingDisabled] = useState(true)

    useEffect(() => {
        noteStore.set(notes)
    }, [notes])

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
                <SidebarSection
                    notes={ noteStore.notes.filter(note => !note.sectionId )}
                    draggingDisabled={ editingDisabled }
                />
                {
                    sections.map(section =>
                        <SidebarSection
                            key={ section.id }
                            section={ section }
                            notes={
                                noteStore.notes
                                    .filter(note => note.sectionId === section.id)
                                    .sort((lhs, rhs) => {
                                        return lhs.position > rhs.position ? 1 : -1
                                    })
                            }
                            draggingDisabled={ editingDisabled }
                        />
                    )
                }
            </Accordion>
        </div>
    )
}
