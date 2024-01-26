"use client"

import React, { useState } from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import CreateDialog from "@/app/dashboard/_components/modals/CreateDialog"

export default function AddDropDownMenu({ className }: { className?: string}) {

    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [isCreatingNote, setIsCreatingNote] = useState(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild={ true }>
                    <Button className={ className } variant="ghost" size="icon">
                        <PlusIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        onClick={ () => {
                            setIsCreatingNote(true)
                            setCreateDialogOpen(true)
                        } }
                    >
                        Add Note
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={ () => {
                            setIsCreatingNote(false)
                            setCreateDialogOpen(true)
                        } }
                    >
                        Add Section
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <CreateDialog
                open={ createDialogOpen }
                onOpenChange={ setCreateDialogOpen }
                type={ isCreatingNote ? "note" :  "section" }
            />
        </>
    )

}
