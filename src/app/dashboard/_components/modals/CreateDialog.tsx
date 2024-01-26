import React, { useState } from "react"

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { trpc } from "@/utils/trpc"
import { useRouter } from "next/navigation"
import { ModalProps } from "@/app/dashboard/_components/modals/props"

interface CreateDialogProps extends ModalProps {
    type: "note" | "section"
}

export default function CreateDialog({ open, onOpenChange, type }: CreateDialogProps) {

    const createSection = trpc.section.createSection.useMutation()
    const createNote = trpc.newNote.createNote.useMutation()
    const [name, setName] = useState("")
    const router = useRouter()

    return (
        <Dialog open={ open } onOpenChange={ onOpenChange }>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create { type }</DialogTitle>
                    <DialogDescription>Create a { type } here. Click save when you are done.</DialogDescription>
                    <div className="flex items-center py-4">
                        <Label className="pr-4" htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Name"
                            onChange={ e => setName(e.target.value) }
                        />
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button
                            onClick={ () => {
                                if (name === "") return

                                const promise = type === "note" ?
                                    createNote.mutateAsync({ name }) : createSection.mutateAsync({ name })

                                toast.promise(promise, {
                                    loading: "Loading...",
                                    success: note => {
                                        if (type === "note")
                                            router.push(`/dashboard/${ note.id }`)
                                        else
                                            router.refresh()

                                        return `Successfully created ${ type }`
                                    },
                                    error: (error: Error) => error.message
                                })
                            } }
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
