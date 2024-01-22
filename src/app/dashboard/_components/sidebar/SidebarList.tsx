"use client"

import React from "react"

import SidebarListSection from "@/app/dashboard/_components/sidebar/SidebarListSection"
import { Note } from "@/app/dashboard/_components/sidebar/types"

export default function SidebarList({ notes }: { notes: Note[] }) {
    return (
        <>
            <SidebarListSection
                title="Public"
                notes={ notes.filter(note => note.public) }
            />
            <SidebarListSection
                title="Private"
                notes={ notes.filter(note => !note.public) }
            />
        </>
    )
}
