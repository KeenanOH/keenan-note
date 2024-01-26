import React from "react"

import {Note} from "@/app/dashboard/_components/sidebar/types"
import SidebarRow from "@/app/dashboard/_components/sidebar/SidebarRow"
import {useDraggable} from "@dnd-kit/core"
import {CSS} from "@dnd-kit/utilities"

export default function DraggableSidebarRow({ note, disabled }: { note: Note, disabled: boolean }) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: note.id,
        data: note,
        disabled: disabled
    })
    const style = {
        transform: CSS.Translate.toString(transform),
    }


    return (
        <div ref={setNodeRef} className="touch-none" style={style} {...listeners} {...attributes}>
            <SidebarRow note={ note } />
        </div>
    )
}
