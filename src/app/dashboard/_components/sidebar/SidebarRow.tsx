import React from "react"

import { Separator } from "@/components/ui/separator"
import SidebarDropdownMenu from "@/app/dashboard/_components/sidebar/SidebarDropdownMenu"
import { Note } from "@/app/dashboard/_components/sidebar/types"
import {useRouter} from "next/navigation"

export default function SidebarRow({ note }: { note: Note }) {

    const router = useRouter()

    return (
        <>
            <div className="flex items-center cursor-pointer" onClick={ () => {
                console.log(note)
                router.push(`/dashboard/${note.id}`)
            } }>
                <p className="text-sm py-2">
                    { note.name }
                </p>

                <SidebarDropdownMenu note={ note } />
            </div>
            <Separator className="my-2" />
        </>
    )
}
