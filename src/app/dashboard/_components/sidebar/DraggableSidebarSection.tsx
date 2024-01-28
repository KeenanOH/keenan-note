import React from "react"

import {Note, Section} from "@/app/dashboard/_components/sidebar/types"
import SidebarSection from "@/app/dashboard/_components/sidebar/SidebarSection"
import {Draggable} from "@hello-pangea/dnd"


export default function DraggableSidebarSection({ section, notes, draggingDisabled, index }: { section?: Section, notes: Note[], draggingDisabled: boolean, index: number }) {
    if (draggingDisabled)
        return <SidebarSection notes={ notes } section={ section } draggingDisabled={ draggingDisabled} />

    return (
        <Draggable draggableId={ `SECTION-${section?.id ?? "Unfilled"}` } index={ index }>
            { provided =>
                <div className="touch-none" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <SidebarSection notes={ notes } section={ section } draggingDisabled={ draggingDisabled} />
                </div>
            }
        </Draggable>
    )
}
