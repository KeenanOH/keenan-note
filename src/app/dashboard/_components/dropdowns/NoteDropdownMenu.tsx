"use client"

import React, {useState} from "react"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {MoreHorizontalIcon} from "lucide-react"
import {Note} from "@/app/dashboard/_components/sidebar/types"
import ConfirmDeleteAlertDialog from "@/app/dashboard/_components/modals/ConfirmDeleteAlertDialog"
import ShareNoteDialog from "@/app/dashboard/_components/modals/ShareNoteDialog"

export default function NoteDropdownMenu({ note }: { note: Note }) {

    const [confirmDeleteAlertDialogOpen, setConfirmDeleteAlertDialogOpen] = useState(false)
    const [shareNoteDialogOpen, setShareNoteDialogOpen] = useState(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild={ true }>
                    <Button className="ml-auto focus-visible:ring-transparent" variant="ghost" size="icon">
                        <MoreHorizontalIcon className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        onClick={ () => setShareNoteDialogOpen(true) }
                    >
                        Share
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-500"
                        onClick={ () => setConfirmDeleteAlertDialogOpen(true) }
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmDeleteAlertDialog
                open={ confirmDeleteAlertDialogOpen }
                onOpenChange={ setConfirmDeleteAlertDialogOpen }
                note={ note }
            />
            <ShareNoteDialog
                open={ shareNoteDialogOpen }
                onOpenChange={ setShareNoteDialogOpen }
                note={ note }
            />
        </>
    )
}
