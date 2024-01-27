import React from "react"

import {Note} from "@/app/dashboard/_components/sidebar/types"
import SidebarRow from "@/app/dashboard/_components/sidebar/SidebarRow"
import { Draggable } from "@hello-pangea/dnd"

export default function DraggableSidebarRow({ note, disabled, index }: { note: Note, disabled: boolean, index: number }) {
    if (disabled)
        return <SidebarRow note={ note } />

    return (
        <Draggable draggableId={ note.id } index={ index }>
            { provided =>
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <SidebarRow note={ note } />
                </div>
            }
        </Draggable>
    )
}
