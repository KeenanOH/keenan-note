import { PlusIcon } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog } from "@radix-ui/react-dialog"
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useState} from "react"
import {toast} from "sonner"
import {trpc} from "@/utils/trpc"
import {AppRouter} from "@/server/app";
import {DefaultDataTransformer, DefaultErrorShape, inferRouterOutputs, RootConfig} from "@trpc/core";
import {UseTRPCQueryResult} from "@trpc/react-query/shared";
import {TRPCClientErrorLike} from "@trpc/client";
import {PrismaClient} from "@prisma/client";
import NoteListCell from "@/app/_components/NoteListCell";

type NotesType = UseTRPCQueryResult<
    { id: string, name: string, public: boolean }[],
    TRPCClientErrorLike<
        RootConfig<
            {
                ctx: {
                    user: {
                        id: string,
                        name: string | null,
                        email: string | null,
                        emailVerified: Date | null,
                        image: string | null
                    } | null | undefined,
                    prisma: PrismaClient
                },
                meta: object,
                errorShape: DefaultErrorShape,
                transformer: DefaultDataTransformer
            }
        >
    >
>

export default function NotesList({ notes, onClick }: { notes: NotesType, onClick: (note: { id: string, name: string, public: boolean }) => void }) {

    const createNote = trpc.note.createNote.useMutation()
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")

    return (
        <div className="w-48 rounded-md border max-h-screen">
            <div className="p-4">
                <div className="flex items-center pb-8">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Notes</h3>
                    <Dialog open={ open } onOpenChange={ setOpen }>
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
                                    Create a note here. Click save when you're done.
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
                                                setOpen(false)
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
                </div>

                <ScrollArea>
                    <h4 className="mb-4 text-sm font-medium leading-none">Public</h4>
                    { notes.data ? notes.data.filter(note => note.public).map(note => <NoteListCell key={ note.id } note={ note } onClick={ onClick } />) : null }
                    <h4 className="mt-8 mb-4 text-sm font-medium leading-none">Private</h4>
                    { notes.data ? notes.data.filter(note => !note.public).map(note => <NoteListCell key={ note.id } note={ note } onClick={ onClick } />) : null }
                </ScrollArea>
            </div>
        </div>
    )
}
