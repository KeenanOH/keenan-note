import React, { useState } from "react"
import { toast } from "sonner"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { trpc } from "@/utils/trpc"
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"

export default function NoteListCell({ note, onClick }: { note: { id: string, name: string, public: boolean }, onClick: (note: { id: string, name: string, public: boolean }) => void }) {

    const updateNote = trpc.note.updateNote.useMutation()
    const deleteNote = trpc.note.deleteNote.useMutation()
    const [shareDialogOpen, setShareDialogOpen] = useState(false)
    const [alertDialogOpen, setAlertDialogOpen] = useState(false)

    return (
        <>
            <div className="flex items-center select-none">
                <ContextMenu >
                    <ContextMenuTrigger>
                        <div className="text-sm cursor-pointer w-screen" onClick={ () => onClick(note) }>
                            { note.name }
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem
                            onClick={ () => setShareDialogOpen(true) }
                        >
                            Share
                        </ContextMenuItem>
                        <ContextMenuItem
                            onClick={ () => setAlertDialogOpen(true) }

                        >
                            Delete
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </div>
            <Separator className="my-2" />

            <Dialog open={ shareDialogOpen } onOpenChange={ setShareDialogOpen }>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Share</DialogTitle>
                        <DialogDescription>
                            You will make this note public. Click share to confirm.
                        </DialogDescription>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="link" className="text-right">
                                    Link
                                </Label>
                                <Input id="link" value={ `https://keenan-note.vercel.app/notes/${note.id}` } className="col-span-3" contentEditable={ false } />
                            </div>
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={ () => {
                                const promise = updateNote.mutateAsync({ id: note.id, public: true })
                                toast.promise(promise, {
                                    loading: "Loading...",
                                    success: () => {
                                        setShareDialogOpen(false)
                                        return "Successfully shared note"
                                    },
                                    error: (error: Error) => error.message
                                })
                            } }
                        >
                            Share
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={ alertDialogOpen } onOpenChange={ setAlertDialogOpen }>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                            This note will be gone forever. Are you sure you want to delete it?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={ () => {
                                const promise = deleteNote.mutateAsync({ id: note.id })
                                toast.promise(promise, {
                                    loading: "Loading...",
                                    success: () => {
                                        setShareDialogOpen(false)
                                        return "Successfully deleted note"
                                    },
                                    error: (error: Error) => error.message
                                })
                            } }
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
