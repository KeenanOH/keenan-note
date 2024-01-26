import React from "react"

import { useServerSession } from "@/server/app"
import SidebarList from "@/app/dashboard/_components/sidebar/SidebarList"
import { ScrollArea } from "@/components/ui/scroll-area"

export default async function Sidebar() {

    const { caller, user } = await useServerSession()
    const notes = await caller.newNote.getNotes()
    const sections = await caller.section.getSections()

    return (
        <div>
            { user &&
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{ user.name }</h2>
            }
            <ScrollArea className="w-64 rounded-md border">
                <div className="min-h-96 md:min-h-0 max-h-[calc(100vh-108px)] p-4">
                    <SidebarList notes={ notes } sections={ sections } />
                </div>
            </ScrollArea>
        </div>
    )
}
