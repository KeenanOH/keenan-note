import React from "react"

import { Note } from "@/app/dashboard/_components/sidebar/types"
import SidebarRow from "@/app/dashboard/_components/sidebar/SidebarRow"

export default function SidebarListSection({ title, notes }: { title: string, notes: Note[] }) {
    return (
        <div>
            <h4 className="mt-8 mb-4 text-sm font-medium leading-none">{ title }</h4>
            {
                notes
                    .map(note =>
                        <SidebarRow key={ note.id } note={ note } />
                    )
            }
        </div>
    )
}
