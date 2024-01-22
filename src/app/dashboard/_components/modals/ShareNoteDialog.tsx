import React from "react"

import {ModalProps} from "@/app/dashboard/_components/modals/props"
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {toast} from "sonner"
import {trpc} from "@/utils/trpc"
import {useRouter} from "next/navigation"

export default function ShareNoteDialog({ open, onOpenChange, note }: ModalProps) {

    const updateNote = trpc.note.updateNote.useMutation()
    const router = useRouter()

    return (
        <Dialog open={ open } onOpenChange={ onOpenChange }>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share</DialogTitle>
                    <DialogDescription>You will make this note public. Click share to confirm.</DialogDescription>
                    <div className="flex items-center py-4">
                        <Label className="pr-4" htmlFor="link">Link</Label>
                        <Input
                            id="link"
                            readOnly={ true }
                            value={ `https://keenan-note.vercel.app/notes/${note.id}` }
                            contentEditable={ false }
                        />
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={ () => {
                            const promise = updateNote.mutateAsync({ id: note.id, public: true })
                            toast.promise(promise, {
                                loading: "Loading...",
                                success: () => {
                                    onOpenChange(false)
                                    router.refresh()
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
    )
}
