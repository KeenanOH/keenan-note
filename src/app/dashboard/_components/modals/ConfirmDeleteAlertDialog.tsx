import React from "react"

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { ModalProps } from "@/app/dashboard/_components/modals/props"
import {trpc} from "@/utils/trpc"
import {toast} from "sonner"
import {useRouter} from "next/navigation"


export default function ConfirmDeleteAlertDialog({ open, onOpenChange, note }: ModalProps) {

    const deleteNote = trpc.note.deleteNote.useMutation()
    const router = useRouter()

    return (
        <AlertDialog open={ open } onOpenChange={ onOpenChange }>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete</AlertDialogTitle>
                    <AlertDialogDescription>This note will be gone forever. Are you sure you want to delete it?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={ () => {
                            const promise = deleteNote.mutateAsync({ id: note.id })
                            toast.promise(promise, {
                                loading: "Loading...",
                                success: () => {
                                    onOpenChange(false)
                                    router.refresh()
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
    )
}
