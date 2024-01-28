"use client"

import React, {useEffect, useState} from "react"

import { Note, Section } from "@/app/dashboard/_components/sidebar/types"
import {Toggle} from "@/components/ui/toggle"
import AddDropDownMenu from "@/app/dashboard/_components/dropdowns/AddDropdownMenu"
import { useNoteStore } from "@/app/_stores/noteStore"
import {Droppable} from "@hello-pangea/dnd"
import DraggableSidebarSection from "@/app/dashboard/_components/sidebar/DraggableSidebarSection"
import {useSectionStore} from "@/app/_stores/sectionStore"
import SidebarSection from "@/app/dashboard/_components/sidebar/SidebarSection"

export default function SidebarList({ notes, sections }: { notes: Note[], sections: Section[] }) {

    const noteStore = useNoteStore()
    const sectionStore = useSectionStore()

    const [editingDisabled, setEditingDisabled] = useState(true)

    useEffect(() => {
        noteStore.set(notes)
        sectionStore.set(sections)
    }, [notes, sections])

    return (
        <div>
            <div className="flex items-center">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Notes</h3>
                <div className="ml-auto flex items-center">
                    <Toggle onClick={ () => setEditingDisabled(editing => !editing) }>{ editingDisabled ? "Edit" : "Finish" }</Toggle>
                    <AddDropDownMenu />
                </div>
            </div>
            <SidebarSection
                section={ { id: "Unfilled", name: "Unfilled", position: 0 } }
                notes={ noteStore.notes.filter(note => !note.sectionId ) }
                draggingDisabled={ editingDisabled }
            />
            <Droppable droppableId="sidebar-list" type="SECTION">
                { provided =>
                    <div {...provided.droppableProps} ref={provided.innerRef} suppressHydrationWarning={ true }>

                        {
                            sectionStore.sections
                                .sort((lhs, rhs) => {
                                    return lhs.position > rhs.position ? 1 : -1
                                })
                                .map((section, index) =>
                                    <DraggableSidebarSection
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
                                        index={ index }
                                    />
                                )
                        }
                    </div>
                }
            </Droppable>
        </div>
    )
}
