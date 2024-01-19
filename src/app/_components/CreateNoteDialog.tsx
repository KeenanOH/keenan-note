import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {PlusIcon} from "lucide-react"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {toast} from "sonner"
import React, {useState} from "react"
import {NotesType} from "@/app/_components/NotesList"
import {trpc} from "@/utils/trpc"

export default function CreateNoteDialog({ open, onOpenChange, notes }: { open: boolean, onOpenChange: (bool: boolean) => void, notes: NotesType }) {

    const createNote = trpc.note.createNote.useMutation()
    const [name, setName] = useState("")

    return (
        <Dialog open={ open } onOpenChange={ onOpenChange }>
            <DialogTrigger asChild>
                <Button
                    className="ml-auto"
                    variant="ghost"
                    size="sm"
                >
                    <PlusIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create note</DialogTitle>
                    <DialogDescription>
                        Create a note here. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" placeholder="Name" className="col-span-3" onChange={ e => setName(e.target.value) } />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={ () => {
                            const promise = createNote.mutateAsync({ name: name, content: "" })
                            toast.promise(promise, {
                                loading: "Loading...",
                                success: note => {
                                    notes.data && notes.data.push(note)
                                    onOpenChange(false)
                                    return "Successfully created note"
                                },
                                error: (error: Error) => error.message
                            })
                        } }
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
