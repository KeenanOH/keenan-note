import React from "react"

import { Separator } from "@/components/ui/separator"
import NoteDropdownMenu from "@/app/dashboard/_components/dropdowns/NoteDropdownMenu"
import { Note } from "@/app/dashboard/_components/sidebar/types"
import {useRouter} from "next/navigation"

export default function SidebarRow({ note }: { note: Note }) {

    const router = useRouter()

    return (
        <>
            <div
                className="flex items-center cursor-pointer"
                onClick={ () => {
                    console.log(note)
                    router.push(`/dashboard/${note.id}`)
                } }
            >
                <p className="text-sm py-2 select-none">
                    { note.name }
                </p>

                <NoteDropdownMenu note={ note } />
            </div>
            <Separator className="my-2" />
        </>
    )
}
