import React from "react"

import { Note } from "@/app/dashboard/_components/sidebar/types"
import SidebarRow from "@/app/dashboard/_components/sidebar/SidebarRow"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"

export default function SidebarListSection({ title, notes }: { title: string, notes: Note[] }) {
    // to default the accordian to open add defaultValue={ title } or remove it to keep closed
    return (
        <div>
            <Accordion type="single" collapsible={ true } className="w-full" defaultValue={ title }>
                <AccordionItem value={ title }>
                    <AccordionTrigger className="hover:no-underline">{ title }</AccordionTrigger>
                    <AccordionContent>
                        {
                            notes
                                .map(note =>
                                    <SidebarRow key={ note.id } note={ note } />
                                )
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
