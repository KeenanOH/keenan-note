"use client"

import React, {useState} from "react"

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {PlusIcon} from "lucide-react"
import {toast} from "sonner"
import {trpc} from "@/utils/trpc"
import {useRouter} from "next/navigation"

export default function CreateNoteDialog({ className }: { className?: string}) {

    const createNote = trpc.note.createNote.useMutation()
    const [name, setName] = useState("")
    const router = useRouter()

    return (
        <Dialog>
            <DialogTrigger asChild={ true }>
                <Button className={ className } variant="ghost" size="icon">
                    <PlusIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create note</DialogTitle>
                    <DialogDescription>Create a note here. Click save when you are done.</DialogDescription>
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

                                const promise = createNote.mutateAsync({ name, content: "" })
                                toast.promise(promise, {
                                    loading: "Loading...",
                                    success: note => {
                                        router.push(`/dashboard/${note.id}`)
                                        return "Successfully created note"
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
