import React from "react"

import { Separator } from "@/components/ui/separator"
import NoteDropdownMenu from "@/app/dashboard/_components/dropdowns/NoteDropdownMenu"
import { Note } from "@/app/dashboard/_components/sidebar/types"

export default function SidebarRow({ note }: { note: Note }) {
    return (
        <a className="bg-white" href={ `/dashboard/${note.id}` }>
            <div className="flex items-center cursor-pointer">
                <p className="text-sm py-2 select-none">
                    { note.name }
                </p>

                <NoteDropdownMenu note={ note } />
            </div>
            <Separator className="my-2" />
        </a>
    )
}
